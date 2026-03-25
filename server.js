const express = require('express');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const archiver = require('archiver');
const multer = require('multer');
const cors = require('cors');
const { execSync } = require('child_process');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 9527;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Default skill directories
const USER_SKILL_DIR = path.join(os.homedir(), '.codebuddy', 'skills');
const DIST_DIR = path.join(__dirname, 'dist');

// Multi-app deployment targets configuration
const DEPLOY_TARGETS = {
  codebuddy: {
    id: 'codebuddy',
    name: 'CodeBuddy',
    icon: '🤖',
    color: '#58a6ff',
    description: 'Tencent CodeBuddy IDE 插件',
    userDir: path.join(os.homedir(), '.codebuddy', 'skills'),
    projectSubDir: '.codebuddy/skills',
    format: 'skill.md',      // native SKILL.md format
    configFile: null
  },
  workbuddy: {
    id: 'workbuddy',
    name: 'WorkBuddy',
    icon: '⚡',
    color: '#bc8cff',
    description: 'WorkBuddy 独立桌面应用',
    userDir: path.join(os.homedir(), '.workbuddy', 'skills'),
    projectSubDir: '.workbuddy/skills',
    format: 'skill.md',
    configFile: null
  },
  claudecode: {
    id: 'claudecode',
    name: 'Claude Code',
    icon: '🧠',
    color: '#d97706',
    description: 'Anthropic Claude Code CLI',
    userDir: path.join(os.homedir(), '.claude', 'rules'),
    projectSubDir: '.claude/rules',
    format: 'claude.md',     // needs conversion to CLAUDE.md rules format
    configFile: null
  }
};

// Ensure directories exist
[DIST_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Convert SKILL.md content to Claude Code rules format
function convertToClaudeFormat(skillInfo) {
  const lines = [];
  lines.push(`# ${skillInfo.displayName || skillInfo.name}`);
  lines.push('');
  if (skillInfo.description_zh) {
    lines.push(`> ${skillInfo.description_zh}`);
    lines.push('');
  }
  if (skillInfo.description) {
    lines.push(`**Trigger**: ${skillInfo.description}`);
    lines.push('');
  }
  if (skillInfo.body) {
    lines.push(skillInfo.body);
  }
  return lines.join('\n');
}

// ============== Helper Functions ==============

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };
  try {
    const frontmatter = yaml.load(match[1]) || {};
    const body = content.slice(match[0].length).trim();
    return { frontmatter, body };
  } catch (e) {
    return { frontmatter: {}, body: content };
  }
}

function generateFrontmatter(data) {
  return `---\n${yaml.dump(data, { lineWidth: -1 }).trim()}\n---`;
}

function getSkillInfo(skillDir) {
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  const metaPath = path.join(skillDir, '_skillhub_meta.json');

  if (!fs.existsSync(skillMdPath)) return null;

  const content = fs.readFileSync(skillMdPath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(content);

  let meta = {};
  if (fs.existsSync(metaPath)) {
    try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')); } catch (e) {}
  }

  // Scan directories
  const dirs = ['scripts', 'references', 'assets', 'hooks', 'tools'];
  const resources = {};
  dirs.forEach(d => {
    const dp = path.join(skillDir, d);
    if (fs.existsSync(dp)) {
      resources[d] = scanDir(dp, dp);
    }
  });

  const stat = fs.statSync(skillDir);
  return {
    name: frontmatter.name || path.basename(skillDir),
    displayName: meta.name || frontmatter.description_zh || frontmatter.name || path.basename(skillDir),
    description: frontmatter.description || '',
    description_zh: frontmatter.description_zh || '',
    description_en: frontmatter.description_en || '',
    allowedTools: frontmatter['allowed-tools'] || '',
    homepage: frontmatter.homepage || '',
    metadata: frontmatter.metadata || null,
    body,
    meta,
    resources,
    path: skillDir,
    dirName: path.basename(skillDir),
    createdAt: stat.birthtime,
    modifiedAt: stat.mtime,
    fileCount: countFiles(skillDir),
    size: getDirSize(skillDir)
  };
}

function scanDir(dir, root) {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(root, fullPath);
    if (entry.isDirectory()) {
      result.push({
        name: entry.name,
        type: 'directory',
        path: relativePath,
        children: scanDir(fullPath, root)
      });
    } else {
      const stat = fs.statSync(fullPath);
      result.push({
        name: entry.name,
        type: 'file',
        path: relativePath,
        size: stat.size,
        ext: path.extname(entry.name)
      });
    }
  }
  return result;
}

function countFiles(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

function getDirSize(dir) {
  let size = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      size += getDirSize(fullPath);
    } else {
      size += fs.statSync(fullPath).size;
    }
  }
  return size;
}

function validateSkill(skillDir) {
  const errors = [];
  const warnings = [];

  const skillMdPath = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(skillMdPath)) {
    errors.push('SKILL.md 文件不存在');
    return { valid: false, errors, warnings };
  }

  const content = fs.readFileSync(skillMdPath, 'utf-8');
  if (!content.startsWith('---')) {
    errors.push('SKILL.md 缺少 YAML frontmatter');
    return { valid: false, errors, warnings };
  }

  const { frontmatter } = parseFrontmatter(content);

  // Required fields
  if (!frontmatter.name) errors.push("缺少必需字段 'name'");
  if (!frontmatter.description) errors.push("缺少必需字段 'description'");

  // Name validation
  if (frontmatter.name) {
    if (!/^[a-z0-9-]+$/.test(frontmatter.name)) {
      errors.push("name 必须是 hyphen-case 格式（仅限小写字母、数字和连字符）");
    }
    if (/^-|-$|--/.test(frontmatter.name)) {
      errors.push("name 不能以连字符开头/结尾，也不能包含连续连字符");
    }
    if (frontmatter.name.length > 64) {
      errors.push(`name 超过最大长度（${frontmatter.name.length}/64）`);
    }
  }

  // Description validation
  if (frontmatter.description) {
    if (/<|>/.test(frontmatter.description)) {
      errors.push("description 不能包含尖括号（< 或 >）");
    }
    if (frontmatter.description.length > 1024) {
      errors.push(`description 超过最大长度（${frontmatter.description.length}/1024）`);
    }
  }

  // Allowed frontmatter keys
  const allowed = new Set(['name', 'description', 'description_zh', 'description_en', 'license', 'allowed-tools', 'metadata', 'homepage']);
  const unexpected = Object.keys(frontmatter).filter(k => !allowed.has(k));
  if (unexpected.length > 0) {
    warnings.push(`存在非标准 frontmatter 字段: ${unexpected.join(', ')}`);
  }

  // Check for TODO items
  if (content.includes('[TODO')) {
    warnings.push('SKILL.md 中存在未完成的 TODO 项');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// ============== API Routes ==============

// GET /api/config - Get configuration
app.get('/api/config', (req, res) => {
  res.json({
    userSkillDir: USER_SKILL_DIR,
    distDir: DIST_DIR,
    homeDir: os.homedir(),
    deployTargets: DEPLOY_TARGETS,
    isElectron: !!process.env.ELECTRON_RUN
  });
});

// GET /api/deploy-targets - Get all available deploy targets with status
app.get('/api/deploy-targets', (req, res) => {
  const targets = Object.values(DEPLOY_TARGETS).map(t => ({
    ...t,
    userDirExists: fs.existsSync(t.userDir),
    skillCount: fs.existsSync(t.userDir) ? 
      fs.readdirSync(t.userDir, { withFileTypes: true }).filter(e => e.isDirectory()).length : 0
  }));
  res.json({ targets });
});

// GET /api/skills - List all skills
app.get('/api/skills', (req, res) => {
  const skillDir = req.query.dir || USER_SKILL_DIR;

  if (!fs.existsSync(skillDir)) {
    return res.json({ skills: [], dir: skillDir });
  }

  const entries = fs.readdirSync(skillDir, { withFileTypes: true });
  const skills = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const info = getSkillInfo(path.join(skillDir, entry.name));
    if (info) skills.push(info);
  }

  skills.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
  res.json({ skills, dir: skillDir });
});

// GET /api/skills/:name - Get single skill detail
app.get('/api/skills/:name', (req, res) => {
  const skillDir = req.query.dir || USER_SKILL_DIR;
  const skillPath = path.join(skillDir, req.params.name);

  if (!fs.existsSync(skillPath)) {
    return res.status(404).json({ error: 'Skill 不存在' });
  }

  const info = getSkillInfo(skillPath);
  if (!info) {
    return res.status(404).json({ error: '无法解析 Skill' });
  }

  res.json(info);
});

// POST /api/skills - Create new skill
app.post('/api/skills', (req, res) => {
  const {
    dirName, name, description, description_zh, description_en,
    allowedTools, homepage, metadata, body, targetDir
  } = req.body;

  const baseDir = targetDir || USER_SKILL_DIR;
  const skillDir = path.join(baseDir, dirName || name);

  if (fs.existsSync(skillDir)) {
    return res.status(409).json({ error: `目录已存在: ${skillDir}` });
  }

  try {
    // Create directory
    fs.mkdirSync(skillDir, { recursive: true });

    // Build frontmatter
    const fm = { name };
    if (description) fm.description = description;
    if (description_zh) fm.description_zh = description_zh;
    if (description_en) fm.description_en = description_en;
    if (allowedTools) fm['allowed-tools'] = allowedTools;
    if (homepage) fm.homepage = homepage;
    if (metadata) fm.metadata = metadata;

    // Write SKILL.md
    const skillContent = `${generateFrontmatter(fm)}\n\n${body || `# ${dirName || name}\n\n## Overview\n\n[在此添加技能说明]\n`}`;
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent, 'utf-8');

    // Write _skillhub_meta.json
    const metaContent = {
      name: description_zh || dirName || name,
      installedAt: Date.now(),
      source: 'local'
    };
    fs.writeFileSync(path.join(skillDir, '_skillhub_meta.json'), JSON.stringify(metaContent, null, 2), 'utf-8');

    // Create resource directories
    const resourceDirs = req.body.resourceDirs || ['scripts', 'references', 'assets'];
    resourceDirs.forEach(d => {
      fs.mkdirSync(path.join(skillDir, d), { recursive: true });
    });

    const info = getSkillInfo(skillDir);
    res.status(201).json(info);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/skills/:name - Update skill
app.put('/api/skills/:name', (req, res) => {
  const skillDir = path.join(req.query.dir || USER_SKILL_DIR, req.params.name);

  if (!fs.existsSync(skillDir)) {
    return res.status(404).json({ error: 'Skill 不存在' });
  }

  const {
    name, description, description_zh, description_en,
    allowedTools, homepage, metadata, body
  } = req.body;

  try {
    // Rebuild SKILL.md
    const fm = {};
    if (name) fm.name = name;
    if (description) fm.description = description;
    if (description_zh) fm.description_zh = description_zh;
    if (description_en) fm.description_en = description_en;
    if (allowedTools) fm['allowed-tools'] = allowedTools;
    if (homepage) fm.homepage = homepage;
    if (metadata) fm.metadata = metadata;

    if (Object.keys(fm).length > 0 || body !== undefined) {
      const existingContent = fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf-8');
      const existing = parseFrontmatter(existingContent);

      const newFm = { ...existing.frontmatter, ...fm };
      const newBody = body !== undefined ? body : existing.body;
      const newContent = `${generateFrontmatter(newFm)}\n\n${newBody}`;
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), newContent, 'utf-8');
    }

    // Update meta
    const metaPath = path.join(skillDir, '_skillhub_meta.json');
    if (fs.existsSync(metaPath)) {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      if (description_zh) meta.name = description_zh;
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8');
    }

    const info = getSkillInfo(skillDir);
    res.json(info);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/skills/:name - Delete skill
app.delete('/api/skills/:name', (req, res) => {
  const skillDir = path.join(req.query.dir || USER_SKILL_DIR, req.params.name);

  if (!fs.existsSync(skillDir)) {
    return res.status(404).json({ error: 'Skill 不存在' });
  }

  try {
    fs.rmSync(skillDir, { recursive: true, force: true });
    res.json({ success: true, message: `已删除 ${req.params.name}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/skills/:name/validate - Validate skill
app.post('/api/skills/:name/validate', (req, res) => {
  const skillDir = path.join(req.query.dir || USER_SKILL_DIR, req.params.name);

  if (!fs.existsSync(skillDir)) {
    return res.status(404).json({ error: 'Skill 不存在' });
  }

  const result = validateSkill(skillDir);
  res.json(result);
});

// POST /api/skills/:name/package - Package skill as .skill file
app.post('/api/skills/:name/package', (req, res) => {
  const skillDir = path.join(req.query.dir || USER_SKILL_DIR, req.params.name);

  if (!fs.existsSync(skillDir)) {
    return res.status(404).json({ error: 'Skill 不存在' });
  }

  // Validate first
  const validation = validateSkill(skillDir);
  if (!validation.valid) {
    return res.status(400).json({ error: '验证失败', details: validation });
  }

  const outputFile = path.join(DIST_DIR, `${req.params.name}.skill`);

  try {
    const output = fs.createWriteStream(outputFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      res.json({
        success: true,
        file: outputFile,
        size: archive.pointer(),
        message: `已打包为 ${outputFile}`
      });
    });

    archive.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });

    archive.pipe(output);
    archive.directory(skillDir, req.params.name);
    archive.finalize();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/skills/:name/deploy - Deploy to target app(s)
app.post('/api/skills/:name/deploy', (req, res) => {
  const sourceDir = req.query.dir || req.body.sourceDir;
  const skillName = req.params.name;
  const sourcePath = path.join(sourceDir || USER_SKILL_DIR, skillName);
  const targetLevel = req.body.level || 'user'; // 'user' or 'project'
  const targetApps = req.body.apps || ['codebuddy']; // array of app ids
  const projectDir = req.body.projectDir;

  if (!fs.existsSync(sourcePath)) {
    // Check if .skill file exists
    const skillFile = path.join(DIST_DIR, `${skillName}.skill`);
    if (!fs.existsSync(skillFile) && !fs.existsSync(sourcePath)) {
      return res.status(404).json({ error: `源 Skill 不存在: ${sourcePath}` });
    }
  }

  // Get skill info for format conversion
  const skillInfo = getSkillInfo(sourcePath);
  if (!skillInfo) {
    return res.status(404).json({ error: '无法解析 Skill 信息' });
  }

  const results = [];
  
  for (const appId of targetApps) {
    const target = DEPLOY_TARGETS[appId];
    if (!target) {
      results.push({ app: appId, success: false, error: `未知的部署目标: ${appId}` });
      continue;
    }

    let targetDir;
    if (targetLevel === 'user') {
      targetDir = target.userDir;
    } else {
      if (!projectDir) {
        results.push({ app: appId, success: false, error: '项目级部署需要指定项目目录' });
        continue;
      }
      targetDir = path.join(projectDir, target.projectSubDir);
    }

    try {
      // Ensure target directory exists
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      if (target.format === 'claude.md') {
        // Claude Code format: convert SKILL.md → .md rule file
        const ruleFileName = `${skillInfo.name}.md`;
        const ruleFilePath = path.join(targetDir, ruleFileName);
        const ruleContent = convertToClaudeFormat(skillInfo);
        fs.writeFileSync(ruleFilePath, ruleContent, 'utf-8');
        
        results.push({
          app: appId,
          appName: target.name,
          icon: target.icon,
          success: true,
          message: `已部署到 ${ruleFilePath}`,
          targetPath: ruleFilePath,
          level: targetLevel,
          format: 'claude.md'
        });
      } else {
        // CodeBuddy / WorkBuddy format: copy skill directory as-is
        const targetPath = path.join(targetDir, skillName);

        if (sourcePath !== targetPath) {
          fs.cpSync(sourcePath, targetPath, { recursive: true, force: true });
        }

        // Update meta
        const metaPath = path.join(targetPath, '_skillhub_meta.json');
        let meta = {};
        if (fs.existsSync(metaPath)) {
          meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        }
        meta.installedAt = Date.now();
        meta.source = 'local';
        meta.deployedFrom = appId;
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8');

        results.push({
          app: appId,
          appName: target.name,
          icon: target.icon,
          success: true,
          message: `已部署到 ${targetPath}`,
          targetPath,
          level: targetLevel,
          format: 'skill.md'
        });
      }
    } catch (e) {
      results.push({ app: appId, appName: target.name, icon: target.icon, success: false, error: e.message });
    }
  }

  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;

  res.json({
    success: failCount === 0,
    message: `部署完成: ${successCount} 成功${failCount > 0 ? `, ${failCount} 失败` : ''}`,
    results,
    successCount,
    failCount
  });
});

// File operations for skill resources
// GET /api/skills/:name/file - Read a file
app.get('/api/skills/:name/file', (req, res) => {
  const skillDir = path.join(req.query.dir || USER_SKILL_DIR, req.params.name);
  const filePath = path.join(skillDir, req.query.path);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: '文件不存在' });
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const stat = fs.statSync(filePath);
    res.json({ content, size: stat.size, modified: stat.mtime });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/skills/:name/file - Write a file
app.put('/api/skills/:name/file', (req, res) => {
  const skillDir = path.join(req.query.dir || USER_SKILL_DIR, req.params.name);
  const filePath = path.join(skillDir, req.body.path);

  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, req.body.content, 'utf-8');
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/skills/:name/file - Delete a file
app.delete('/api/skills/:name/file', (req, res) => {
  const skillDir = path.join(req.query.dir || USER_SKILL_DIR, req.params.name);
  const filePath = path.join(skillDir, req.query.path);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: '文件不存在' });
  }

  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fs.rmSync(filePath, { recursive: true });
    } else {
      fs.unlinkSync(filePath);
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/skills/:name/directory - Create a directory
app.post('/api/skills/:name/directory', (req, res) => {
  const skillDir = path.join(req.query.dir || USER_SKILL_DIR, req.params.name);
  const dirPath = path.join(skillDir, req.body.path);

  try {
    fs.mkdirSync(dirPath, { recursive: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/browse - Browse filesystem directory
app.post('/api/browse', (req, res) => {
  const dir = req.body.path || os.homedir();

  if (!fs.existsSync(dir)) {
    return res.status(404).json({ error: '目录不存在' });
  }

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const items = entries
      .filter(e => e.isDirectory() && !e.name.startsWith('.'))
      .map(e => ({
        name: e.name,
        path: path.join(dir, e.name),
        type: 'directory'
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    res.json({
      current: dir,
      parent: path.dirname(dir),
      items
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/download/:name - Download packaged skill
app.get('/api/download/:name', (req, res) => {
  const filePath = path.join(DIST_DIR, `${req.params.name}.skill`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: '打包文件不存在，请先打包' });
  }
  res.download(filePath);
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export for Electron integration
module.exports = { app, PORT, USER_SKILL_DIR };

// Start server only when run directly (not imported by Electron)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Skill Creator Tool 已启动`);
    console.log(`   地址: http://localhost:${PORT}`);
    console.log(`   Skills 目录: ${USER_SKILL_DIR}\n`);
  });
}
