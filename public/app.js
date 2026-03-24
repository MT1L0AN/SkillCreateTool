// ============== State ==============
const S = {
  skills: [], currentDir: '', currentPage: 'dashboard',
  editingSkill: null, wizardStep: 0,
  wizardData: {}, config: {}, deployTargets: {},
  currentApp: 'codebuddy', currentTheme: 'dark'
};

// ============== API ==============
const api = {
  async get(u) { return (await fetch(u)).json(); },
  async post(u, d) { return (await fetch(u, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) })).json(); },
  async put(u, d) { return (await fetch(u, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(d) })).json(); },
  async del(u) { return (await fetch(u, { method:'DELETE' })).json(); }
};

// ============== Theme System ==============
const THEMES = {
  dark:   { icon: '🌙', label: '深邃暗色' },
  light:  { icon: '☀️', label: '清爽亮色' },
  purple: { icon: '🔮', label: '赛博紫' },
  ocean:  { icon: '🌊', label: '深海蓝' },
  forest: { icon: '🌲', label: '森林绿' },
  sunset: { icon: '🌅', label: '暖日落' }
};

function switchTheme(theme) {
  if (!THEMES[theme]) return;
  S.currentTheme = theme;
  document.body.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeIcon').textContent = THEMES[theme].icon;
  // Update active state
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === theme);
  });
  localStorage.setItem('skill-creator-theme', theme);
  setTimeout(() => document.body.classList.remove('theme-transitioning'), 350);
  closeThemeSwitcher();
}

function toggleThemeSwitcher() {
  const sw = document.getElementById('themeSwitcher');
  const isOpen = sw.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) sw.classList.add('open');
}

function closeThemeSwitcher() {
  document.getElementById('themeSwitcher')?.classList.remove('open');
}

// ============== Directory Switcher ==============
const APP_DIR_INFO = {
  codebuddy: { icon: '🤖', label: 'CodeBuddy' },
  workbuddy: { icon: '⚡', label: 'WorkBuddy' },
  claudecode: { icon: '🧠', label: 'Claude Code' }
};

function switchAppDir(appId) {
  const target = S.deployTargets[appId];
  if (!target) return;
  S.currentApp = appId;
  S.currentDir = target.userDir;
  // Update UI
  document.getElementById('dirSwitcherIcon').textContent = APP_DIR_INFO[appId]?.icon || '📂';
  document.getElementById('dirSwitcherLabel').textContent = APP_DIR_INFO[appId]?.label || appId;
  document.getElementById('currentDir').textContent = S.currentDir.replace(S.config.homeDir, '~');
  // Update active state in dropdown
  document.querySelectorAll('.dir-switcher-item[data-app]').forEach(el => {
    el.classList.toggle('active', el.dataset.app === appId);
  });
  localStorage.setItem('skill-creator-app', appId);
  closeDirSwitcher();
  refreshSkills();
  showToast(`已切换到 ${APP_DIR_INFO[appId]?.label || appId} 技能目录`, 'success');
}

function toggleDirSwitcher() {
  const sw = document.getElementById('dirSwitcher');
  const isOpen = sw.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) sw.classList.add('open');
}

function closeDirSwitcher() {
  document.getElementById('dirSwitcher')?.classList.remove('open');
}

function closeAllDropdowns() {
  closeDirSwitcher();
  closeThemeSwitcher();
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dir-switcher') && !e.target.closest('.theme-switcher')) {
    closeAllDropdowns();
  }
});

// ============== Helpers ==============
function showToast(msg, type='info') {
  const c = document.getElementById('toastContainer');
  const icons = {success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'};
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(100%)'; setTimeout(()=>t.remove(),300); }, 3000);
}

function esc(s) { return s ? s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : ''; }
function fmtSize(b) { if(b<1024)return b+' B'; if(b<1048576)return(b/1024).toFixed(1)+' KB'; return(b/1048576).toFixed(1)+' MB'; }
function fmtDate(d) { if(!d)return'-'; const dt=new Date(d); return dt.toLocaleDateString('zh-CN')+' '+dt.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}); }
function fileIcon(ext) { const m={'.py':'🐍','.sh':'🔧','.js':'📜','.md':'📝','.json':'📋','.yaml':'📋','.txt':'📄'}; return m[ext]||'📄'; }

function showModal(title, body, onConfirm) {
  const el = document.createElement('div');
  el.className = 'modal-overlay';
  el.onclick = e => { if(e.target===el) el.remove(); };
  el.innerHTML = `<div class="modal">
    <div class="modal-header"><h2>${title}</h2><button class="btn btn-sm btn-ghost" onclick="this.closest('.modal-overlay').remove()">✕</button></div>
    <div class="modal-body">${body}</div>
    <div class="modal-footer"><button class="btn" onclick="this.closest('.modal-overlay').remove()">取消</button>
    <button class="btn btn-primary" id="modalConfirm">确认</button></div></div>`;
  document.body.appendChild(el);
  if(onConfirm) el.querySelector('#modalConfirm').onclick = async () => { await onConfirm(); el.remove(); };
}

function simpleMd(md) {
  if(!md) return '<p style="color:var(--text-dim)">暂无内容</p>';
  let h = esc(md);
  h = h.replace(/^### (.+)$/gm,'<h3>$1</h3>');
  h = h.replace(/^## (.+)$/gm,'<h2>$1</h2>');
  h = h.replace(/^# (.+)$/gm,'<h1>$1</h1>');
  h = h.replace(/```(\w*)\n([\s\S]*?)```/g,'<pre><code>$2</code></pre>');
  h = h.replace(/`([^`]+)`/g,'<code>$1</code>');
  h = h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" style="color:var(--text-link)">$1</a>');
  h = h.replace(/^- (.+)$/gm,'<li>$1</li>');
  h = h.replace(/\n\n/g,'</p><p>');
  return '<p>'+h+'</p>';
}

// ============== Navigation ==============
function navigateTo(page, params) {
  S.currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const nav = document.querySelector(`.nav-item[data-page="${page}"]`);
  if(nav) nav.classList.add('active');
  const titles = {dashboard:'仪表盘',skills:'技能列表',create:'创建技能',edit:'编辑技能',detail:'技能详情',package:'打包发布',deploy:'部署管理'};
  document.getElementById('pageTitle').textContent = titles[page]||page;
  const r = {dashboard:renderDashboard,skills:renderSkillList,create:renderCreateWizard,edit:()=>renderEditSkill(params),detail:()=>renderSkillDetail(params),package:renderPackagePage,deploy:renderDeployPage};
  if(r[page]) r[page]();
}

// ============== Init ==============
async function init() {
  S.config = await api.get('/api/config');
  S.deployTargets = S.config.deployTargets || {};

  // Restore saved theme
  const savedTheme = localStorage.getItem('skill-creator-theme') || 'dark';
  switchTheme(savedTheme);

  // Restore saved app directory
  const savedApp = localStorage.getItem('skill-creator-app') || 'codebuddy';
  const target = S.deployTargets[savedApp];
  if (target) {
    S.currentApp = savedApp;
    S.currentDir = target.userDir;
    document.getElementById('dirSwitcherIcon').textContent = APP_DIR_INFO[savedApp]?.icon || '📂';
    document.getElementById('dirSwitcherLabel').textContent = APP_DIR_INFO[savedApp]?.label || savedApp;
    document.querySelectorAll('.dir-switcher-item[data-app]').forEach(el => {
      el.classList.toggle('active', el.dataset.app === savedApp);
    });
  } else {
    S.currentDir = S.config.userSkillDir;
  }
  
  // Update dir path display items in dropdown
  for (const [appId, t] of Object.entries(S.deployTargets)) {
    const item = document.querySelector(`.dir-switcher-item[data-app="${appId}"] .dir-switcher-item-path`);
    if (item) item.textContent = t.userDir.replace(S.config.homeDir, '~');
  }

  document.getElementById('currentDir').textContent = S.currentDir.replace(S.config.homeDir, '~');
  await refreshSkills();
  navigateTo('dashboard');
}

async function refreshSkills() {
  const d = await api.get(`/api/skills?dir=${encodeURIComponent(S.currentDir)}`);
  S.skills = d.skills || [];
  document.getElementById('skillCount').textContent = S.skills.length;
  if(['dashboard','skills'].includes(S.currentPage)) navigateTo(S.currentPage);
}

// ============== Dashboard ==============
function renderDashboard() {
  const t = S.skills.length, l = S.skills.filter(s=>s.meta.source==='local').length;
  const mp = t-l, tf = S.skills.reduce((a,s)=>a+(s.fileCount||0),0);
  const recent = S.skills.slice(0,6);
  document.getElementById('mainContent').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-icon blue">🧩</div><div><div class="stat-value">${t}</div><div class="stat-label">技能总数</div></div></div>
      <div class="stat-card"><div class="stat-icon green">💻</div><div><div class="stat-value">${l}</div><div class="stat-label">本地创建</div></div></div>
      <div class="stat-card"><div class="stat-icon purple">🏪</div><div><div class="stat-value">${mp}</div><div class="stat-label">市场安装</div></div></div>
      <div class="stat-card"><div class="stat-icon orange">📁</div><div><div class="stat-value">${tf}</div><div class="stat-label">总文件数</div></div></div>
    </div>
    <div style="display:flex;gap:16px;margin-bottom:24px">
      <button class="btn btn-primary btn-lg" onclick="navigateTo('create')" style="flex:1">✨ 创建新技能</button>
      <button class="btn btn-lg" onclick="navigateTo('skills')" style="flex:1">🧩 管理技能</button>
      <button class="btn btn-lg" onclick="navigateTo('package')" style="flex:1">📦 打包发布</button>
    </div>
    <div class="section-title">📋 最近技能</div>
    <div class="skills-grid">${recent.map(s=>skillCard(s)).join('')}</div>
    ${t===0?`<div class="empty-state"><div class="icon">🎯</div><h3>开始创建你的第一个技能</h3>
    <p>技能是模块化的扩展包，为 CodeBuddy 添加专业知识和工作流</p>
    <button class="btn btn-primary" onclick="navigateTo('create')">✨ 创建技能</button></div>`:''}`;
}

function skillCard(s) {
  return `<div class="skill-card" onclick="navigateTo('detail','${s.dirName}')">
    <div class="skill-card-header"><div class="skill-card-icon">🧩</div>
    <span class="skill-source ${s.meta.source||'local'}">${s.meta.source==='marketplace'?'市场':'本地'}</span></div>
    <div class="skill-card-name">${esc(s.displayName)}</div>
    <div class="skill-card-desc">${esc(s.description_zh||s.description)}</div>
    <div class="skill-card-meta"><span>📄 ${s.fileCount} 文件</span><span>💾 ${fmtSize(s.size)}</span><span>🕐 ${fmtDate(s.modifiedAt)}</span></div></div>`;
}

// ============== Skill List ==============
function renderSkillList() {
  document.getElementById('mainContent').innerHTML = `
    <div class="toolbar"><div style="display:flex;gap:8px"><div class="search-bar"><span>🔍</span>
    <input type="text" placeholder="搜索技能..." id="searchInput" oninput="filterSkills()"></div></div>
    <button class="btn btn-primary" onclick="navigateTo('create')">✨ 创建技能</button></div>
    <div class="skills-grid" id="skillsGrid">${S.skills.map(s=>skillCard(s)).join('')}</div>
    ${S.skills.length===0?'<div class="empty-state"><div class="icon">📭</div><h3>暂无技能</h3><p>当前目录下没有找到任何技能</p></div>':''}`;
}

function filterSkills() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const f = S.skills.filter(s => s.displayName.toLowerCase().includes(q) || (s.description||'').toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
  document.getElementById('skillsGrid').innerHTML = f.map(s=>skillCard(s)).join('');
}

// ============== Skill Detail ==============
async function renderSkillDetail(name) {
  const sk = await api.get(`/api/skills/${encodeURIComponent(name)}?dir=${encodeURIComponent(S.currentDir)}`);
  if(sk.error){showToast(sk.error,'error');return;}
  S.editingSkill = sk;
  document.getElementById('pageTitle').textContent = sk.displayName;
  const mc = document.getElementById('mainContent');
  mc.innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap">
      <button class="btn" onclick="navigateTo('skills')">← 返回</button>
      <button class="btn btn-primary" onclick="navigateTo('edit','${name}')">✏️ 编辑</button>
      <button class="btn btn-success" onclick="validateAction('${name}')">✅ 验证</button>
      <button class="btn" onclick="packageAction('${name}')">📦 打包</button>
      <button class="btn" onclick="deployAction('${name}')">🚀 部署</button>
      <button class="btn btn-danger" onclick="deleteAction('${name}')">🗑️ 删除</button>
    </div>
    <div id="valArea"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
      <div class="card"><div class="section-title">📋 基本信息</div>
      <table style="width:100%;font-size:13px">
        <tr><td style="color:var(--text-dim);padding:4px 8px;width:100px">标识名</td><td style="padding:4px 8px;font-family:var(--font-mono)">${esc(sk.name)}</td></tr>
        <tr><td style="color:var(--text-dim);padding:4px 8px">显示名</td><td style="padding:4px 8px">${esc(sk.displayName)}</td></tr>
        <tr><td style="color:var(--text-dim);padding:4px 8px">中文描述</td><td style="padding:4px 8px">${esc(sk.description_zh)}</td></tr>
        <tr><td style="color:var(--text-dim);padding:4px 8px">来源</td><td style="padding:4px 8px"><span class="skill-source ${sk.meta.source||'local'}">${sk.meta.source||'local'}</span></td></tr>
        <tr><td style="color:var(--text-dim);padding:4px 8px">工具限制</td><td style="padding:4px 8px;font-family:var(--font-mono)">${esc(sk.allowedTools)||'全部'}</td></tr>
        <tr><td style="color:var(--text-dim);padding:4px 8px">文件/大小</td><td style="padding:4px 8px">${sk.fileCount} 文件 / ${fmtSize(sk.size)}</td></tr>
        <tr><td style="color:var(--text-dim);padding:4px 8px">路径</td><td style="padding:4px 8px;font-family:var(--font-mono);font-size:11px;word-break:break-all">${esc(sk.path)}</td></tr>
      </table></div>
      <div class="card"><div class="section-title">📁 资源目录</div><div class="file-tree">${renderTree(sk.resources)}</div></div>
    </div>
    <div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div class="section-title" style="margin:0">📄 SKILL.md</div>
        <div class="tabs" style="border:0;margin:0"><div class="tab active" onclick="showTab('prev',this)">预览</div><div class="tab" onclick="showTab('src',this)">源码</div></div>
      </div>
      <div id="prev" class="preview-pane" style="background:var(--bg);border-radius:var(--radius);max-height:500px;overflow-y:auto">${simpleMd(sk.body)}</div>
      <div id="src" style="display:none"><div id="cmSourceView"></div></div>
    </div>`;

  // Store body for source view lazy init
  S._detailBody = sk.body || '';
  S._detailSourceInited = false;
}

function renderTree(res) {
  if(!res||!Object.keys(res).length) return '<div style="color:var(--text-dim);font-size:13px;padding:8px">无额外资源</div>';
  let h = '';
  for(const[d,items]of Object.entries(res)){
    h += `<div class="file-tree-item"><span>📁</span> <strong>${esc(d)}/</strong></div>`;
    if(Array.isArray(items)) h += renderItems(items,1);
  }
  return h;
}

function renderItems(items, depth) {
  let h = '';
  for(const it of items){
    h += `<div class="file-tree-item" style="padding-left:${depth*16+8}px">
      <span>${it.type==='directory'?'📁':fileIcon(it.ext)}</span> ${esc(it.name)}
      ${it.size!==undefined?`<span style="margin-left:auto;color:var(--text-dim);font-size:11px">${fmtSize(it.size)}</span>`:''}
    </div>`;
    if(it.children) h += renderItems(it.children, depth+1);
  }
  return h;
}

function showTab(id, el) {
  el.parentElement.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('prev').style.display = id==='prev'?'':'none';
  document.getElementById('src').style.display = id==='src'?'':'none';
  // Lazy-init CodeMirror readonly source view
  if (id === 'src' && !S._detailSourceInited) {
    S._detailSourceInited = true;
    const initCM = () => {
      const wrap = document.getElementById('cmSourceView');
      if (!wrap) return;
      window.CM.create(wrap, {
        value: S._detailBody || '',
        lang: 'markdown',
        readOnly: true,
        lineWrapping: true,
        minHeight: '200px'
      });
    };
    if (window.CM) requestAnimationFrame(initCM);
    else window.addEventListener('cm-ready', () => requestAnimationFrame(initCM), {once:true});
  }
}

// ============== Create Wizard ==============
const TEMPLATES = {
  blank: '',
  workflow: `# 技能名称\n\n## Overview\n\n[技能功能概述]\n\n## 工作流\n\n### 步骤 1: 分析输入\n\n[说明]\n\n### 步骤 2: 处理数据\n\n[说明]\n\n### 步骤 3: 输出结果\n\n[说明]\n\n## 注意事项\n\n- [注意项]`,
  tool: `# 工具名称\n\n基于 [工具名] 封装的脚本工具集。\n\n## 前置条件\n\n\`\`\`bash\ncd scripts/\n./install-check.sh\n\`\`\`\n\n## 脚本参考\n\n| 脚本 | 用途 | 参数 |\n|------|------|------|\n| example.sh | 示例 | - |\n\n## 注意事项\n\n- [注意项]`,
  api: `# API 名称\n\n## 环境变量\n\n- \`API_ENDPOINT\` - API 地址\n- \`API_TOKEN\` - 认证 Token\n\n## 请求模板\n\n\`\`\`bash\ncurl -s -H "Authorization: Bearer $API_TOKEN" "$API_ENDPOINT/path"\n\`\`\`\n\n## 常用接口\n\n| 接口 | 说明 |\n|------|------|\n| list | 列表查询 |`,
  guidelines: `# 规范名称\n\n## 概述\n\n[规范说明]\n\n## 基本原则\n\n1. [原则 1]\n2. [原则 2]\n\n## 详细规范\n\n### 类别 A\n\n[详细说明]`
};

function renderCreateWizard() {
  S.wizardStep = 0;
  S.wizardData = { template:'blank', dirName:'', name:'', description:'', description_zh:'', description_en:'',
    allowedTools:'', homepage:'', body:'', resourceDirs:['scripts','references','assets'], targetDir:S.currentDir,
    deployApps:['codebuddy'] };
  renderStep();
}

function renderStep() {
  const steps = ['选择模板','基本信息','技能内容','目录配置','确认创建'];
  const d = S.wizardData, st = S.wizardStep;
  let stepsH = steps.map((s,i)=>`<div class="wizard-step ${i<st?'completed':''} ${i===st?'active':''}">
    <div class="step-number">${i<st?'✓':i+1}</div><div class="step-label">${s}</div></div>`).join('');

  let c = '';
  if(st===0) {
    const tpls = [{k:'blank',i:'📄',n:'空白技能',d:'从零开始'},{k:'workflow',i:'🔄',n:'工作流模板',d:'步骤式流程'},{k:'tool',i:'🔧',n:'工具集成',d:'CLI工具封装'},{k:'api',i:'🌐',n:'API集成',d:'REST API封装'},{k:'guidelines',i:'📏',n:'规范指南',d:'标准文档'}];
    c = `<h3 style="margin-bottom:16px">选择技能模板</h3><p style="color:var(--text-dim);margin-bottom:20px">选择一个模板作为起点</p>
      <div class="template-grid">${tpls.map(t=>`<div class="template-card ${d.template===t.k?'selected':''}" onclick="selectTpl('${t.k}')">
      <div class="icon">${t.i}</div><h4>${t.n}</h4><p>${t.d}</p></div>`).join('')}</div>`;
  } else if(st===1) {
    c = `<h3 style="margin-bottom:16px">基本信息</h3>
      <div class="form-row">
        <div class="form-group"><label class="form-label">目录名称 <span class="required">*</span></label>
        <input class="form-input" id="w_dir" value="${esc(d.dirName)}" placeholder="例如：my-skill" oninput="S.wizardData.dirName=this.value;autoName()">
        <div class="form-hint">技能文件夹名称</div></div>
        <div class="form-group"><label class="form-label">标识名 <span class="required">*</span></label>
        <input class="form-input" id="w_name" value="${esc(d.name)}" placeholder="lowercase-hyphen-case" oninput="S.wizardData.name=this.value" style="font-family:var(--font-mono)">
        <div class="form-hint">hyphen-case 格式，最长 64 字符</div></div>
      </div>
      <div class="form-group"><label class="form-label">触发描述 <span class="required">*</span></label>
        <textarea class="form-textarea" id="w_desc" rows="3" placeholder="描述技能功能和使用场景..." oninput="S.wizardData.description=this.value" style="font-family:inherit;min-height:80px">${esc(d.description)}</textarea>
        <div class="form-hint">系统根据此描述自动判断何时触发技能（最长 1024 字符）</div></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">中文简述</label><input class="form-input" id="w_zh" value="${esc(d.description_zh)}" placeholder="一句话中文描述" oninput="S.wizardData.description_zh=this.value"></div>
        <div class="form-group"><label class="form-label">英文简述</label><input class="form-input" id="w_en" value="${esc(d.description_en)}" placeholder="English desc" oninput="S.wizardData.description_en=this.value"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">允许工具</label><input class="form-input" value="${esc(d.allowedTools)}" placeholder="Bash,Read,Glob（留空=全部）" oninput="S.wizardData.allowedTools=this.value"></div>
        <div class="form-group"><label class="form-label">主页链接</label><input class="form-input" value="${esc(d.homepage)}" placeholder="https://..." oninput="S.wizardData.homepage=this.value"></div>
      </div>`;
  } else if(st===2) {
    c = `<h3 style="margin-bottom:16px">技能内容</h3><p style="color:var(--text-dim);margin-bottom:16px">编写 SKILL.md 正文内容</p>
      <div class="code-editor"><div class="code-editor-header"><span>📝 SKILL.md (Markdown)</span>
      <div style="display:flex;gap:8px"><button class="btn btn-sm btn-ghost" onclick="insertSnipCM('wf')">插入工作流</button>
      <button class="btn btn-sm btn-ghost" onclick="insertSnipCM('sc')">插入脚本引用</button>
      <button class="btn btn-sm btn-ghost" onclick="insertSnipCM('tb')">插入表格</button></div></div>
      <div id="cmWizardBody"></div></div>`;
  } else if(st===3) {
    const dirs=['scripts','references','assets','hooks','tools'];
    const desc={scripts:'可执行脚本',references:'参考文档',assets:'输出资产',hooks:'钩子配置',tools:'工具集合'};
    c = `<h3 style="margin-bottom:16px">目录配置</h3>
      <div class="form-group"><label class="form-label">创建位置</label>
        <div style="display:flex;gap:8px"><input class="form-input" id="w_target" value="${esc(d.targetDir)}" oninput="S.wizardData.targetDir=this.value" style="font-family:var(--font-mono);font-size:12px">
        <button class="btn btn-sm" onclick="browseTgt()">📂 浏览</button></div></div>
      <div class="form-group"><label class="form-label">资源目录</label>
        <div class="checkbox-group">${dirs.map(dir=>`<div class="checkbox-item ${d.resourceDirs.includes(dir)?'checked':''}" onclick="toggleDir('${dir}')">
        <span>${d.resourceDirs.includes(dir)?'☑️':'⬜'}</span><div><div style="font-weight:500">${dir}/</div><div style="font-size:11px;color:var(--text-dim)">${desc[dir]}</div></div></div>`).join('')}</div></div>
      <div class="card" style="background:var(--bg);margin-top:16px"><div class="section-title" style="font-size:13px">📂 目录预览</div>
      <pre style="font-family:var(--font-mono);font-size:13px;color:var(--text-dim);line-height:1.8">${d.dirName||d.name||'skill-name'}/\n├── SKILL.md\n├── _skillhub_meta.json\n${d.resourceDirs.map((dir,i)=>`${i===d.resourceDirs.length-1?'└':'├'}── ${dir}/`).join('\n')}</pre></div>`;
  } else {
    const targets = Object.values(S.deployTargets);
    const deployCardsH = targets.map(t => `
      <div class="deploy-target-card ${d.deployApps.includes(t.id)?'selected':''}" data-app="${t.id}" onclick="toggleWizDeployApp('${t.id}')">
        <div class="target-check">${d.deployApps.includes(t.id)?'✓':''}</div>
        <div class="target-header">
          <div class="target-icon" style="background:${t.color}22">${t.icon}</div>
          <div><div class="target-name">${t.name}</div><div class="target-desc">${t.description}</div></div>
        </div>
        <div class="target-info"><span>📄 ${t.format === 'skill.md' ? 'SKILL.md 原生' : 'Rules 规则'}</span></div>
      </div>`).join('');

    c = `<h3 style="margin-bottom:16px">确认创建</h3>
      <div class="card" style="margin-bottom:16px"><table style="width:100%;font-size:14px">
        <tr><td style="color:var(--text-dim);padding:6px 12px;width:120px">目录名</td><td style="padding:6px 12px;font-weight:500">${esc(d.dirName||d.name)}</td></tr>
        <tr><td style="color:var(--text-dim);padding:6px 12px">标识名</td><td style="padding:6px 12px;font-family:var(--font-mono)">${esc(d.name)}</td></tr>
        <tr><td style="color:var(--text-dim);padding:6px 12px">触发描述</td><td style="padding:6px 12px;font-size:13px">${esc(d.description).substring(0,200)}${d.description.length>200?'...':''}</td></tr>
        <tr><td style="color:var(--text-dim);padding:6px 12px">中文简述</td><td style="padding:6px 12px">${esc(d.description_zh)||'-'}</td></tr>
        <tr><td style="color:var(--text-dim);padding:6px 12px">创建位置</td><td style="padding:6px 12px;font-family:var(--font-mono);font-size:12px">${esc(d.targetDir)}/${esc(d.dirName||d.name)}</td></tr>
        <tr><td style="color:var(--text-dim);padding:6px 12px">资源目录</td><td style="padding:6px 12px">${d.resourceDirs.join(', ')||'无'}</td></tr>
      </table></div>
      <div style="margin-bottom:16px">
        <div class="section-title">🎯 创建后自动部署到</div>
        <p style="color:var(--text-dim);margin-bottom:12px;font-size:13px">选择目标应用，创建完成后将自动部署（可不选）</p>
        <div class="deploy-targets">${deployCardsH}</div>
      </div>`;
  }

  document.getElementById('mainContent').innerHTML = `
    <div class="wizard-steps">${stepsH}</div>
    <div class="wizard-content">${c}
      <div class="wizard-footer"><div>${st>0?`<button class="btn" onclick="wizPrev()">← 上一步</button>`:`<button class="btn" onclick="navigateTo('dashboard')">取消</button>`}</div>
      <div>${st<4?`<button class="btn btn-primary" onclick="wizNext()">下一步 →</button>`:`<button class="btn btn-success btn-lg" onclick="createSkill()">🚀 创建技能</button>`}</div></div></div>`;
  // Init CodeMirror for step 2
  if (st === 2) {
    if (window.CM) requestAnimationFrame(initWizardCM);
    else window.addEventListener('cm-ready', () => requestAnimationFrame(initWizardCM), {once:true});
  }
}

function selectTpl(k) { S.wizardData.template=k; S.wizardData.body=TEMPLATES[k]||''; renderStep(); }
function autoName() { const d=S.wizardData; if(!d.name){const a=d.dirName.toLowerCase().replace(/[\s_]+/g,'-').replace(/[^a-z0-9-]/g,'').replace(/-+/g,'-').replace(/^-|-$/g,'');document.getElementById('w_name').value=a;d.name=a;} }
function wizNext() { if(S.wizardStep===1){const d=S.wizardData;if(!d.name){showToast('请填写标识名','warning');return;}if(!/^[a-z0-9-]+$/.test(d.name)){showToast('标识名必须是 hyphen-case','warning');return;}if(!d.description){showToast('请填写触发描述','warning');return;}} S.wizardStep=Math.min(4,S.wizardStep+1);renderStep(); }
function wizPrev() { S.wizardStep=Math.max(0,S.wizardStep-1);renderStep(); }
function toggleDir(d) { const i=S.wizardData.resourceDirs.indexOf(d); if(i>=0)S.wizardData.resourceDirs.splice(i,1);else S.wizardData.resourceDirs.push(d); renderStep(); }

// CodeMirror-based snippet insertion for wizard body editor
function insertSnipCM(t) {
  if (!S._wizardCmView) return;
  const snips = {
    wf: '\n## 工作流\n\n### 步骤 1\n\n[说明]\n',
    sc: '\n```bash\n./scripts/example.sh\n```\n',
    tb: '\n| 列1 | 列2 |\n|-----|-----|\n| 值1 | 值2 |\n'
  };
  const view = S._wizardCmView;
  const pos = view.state.selection.main.head;
  view.dispatch({ changes: { from: pos, insert: snips[t] } });
  view.focus();
}

// Initialize CodeMirror for wizard step 2 after DOM rendered
function initWizardCM() {
  if (S.wizardStep !== 2 || !window.CM) return;
  const wrap = document.getElementById('cmWizardBody');
  if (!wrap) return;
  if (S._wizardCmView) { S._wizardCmView.destroy(); S._wizardCmView = null; }
  S._wizardCmView = window.CM.create(wrap, {
    value: S.wizardData.body || '',
    lang: 'markdown',
    minHeight: '400px',
    onChange: (val) => { S.wizardData.body = val; }
  });
}

// Hook: after renderStep, init CM if on step 2

function toggleWizDeployApp(appId) {
  const i = S.wizardData.deployApps.indexOf(appId);
  if (i >= 0) S.wizardData.deployApps.splice(i, 1);
  else S.wizardData.deployApps.push(appId);
  renderStep();
}

async function createSkill() {
  const d = S.wizardData;
  try {
    const r = await api.post('/api/skills', {
      dirName:d.dirName||d.name, name:d.name, description:d.description,
      description_zh:d.description_zh, description_en:d.description_en,
      allowedTools:d.allowedTools, homepage:d.homepage, body:d.body,
      resourceDirs:d.resourceDirs, targetDir:d.targetDir
    });
    if(r.error){showToast(r.error,'error');return;}
    showToast('技能创建成功！','success');

    // Auto-deploy if apps selected
    if (d.deployApps && d.deployApps.length > 0) {
      showToast('正在自动部署...','info');
      const dr = await api.post(`/api/skills/${encodeURIComponent(r.dirName)}/deploy`, {
        level: 'user',
        sourceDir: d.targetDir,
        apps: d.deployApps
      });
      if (dr.results) {
        const ok = dr.results.filter(x => x.success).length;
        const fail = dr.results.filter(x => !x.success).length;
        showToast(`自动部署: ${ok} 个应用成功${fail ? `, ${fail} 个失败` : ''}`, fail ? 'warning' : 'success');
      }
    }

    await refreshSkills();
    navigateTo('detail', r.dirName);
  } catch(e) { showToast('创建失败: '+e.message,'error'); }
}

// ============== Edit Skill ==============
async function renderEditSkill(name) {
  const sk = await api.get(`/api/skills/${encodeURIComponent(name)}?dir=${encodeURIComponent(S.currentDir)}`);
  if(sk.error){showToast(sk.error,'error');return;}
  S.editingSkill = sk;
  document.getElementById('pageTitle').textContent = '编辑 - '+sk.displayName;
  const mc = document.getElementById('mainContent');

  let filesH = '';
  const allF = [];
  function collect(items, prefix) { for(const it of items){const p=prefix?prefix+'/'+it.name:it.name; if(it.type==='directory'){allF.push({n:p+'/',t:'dir'});if(it.children)collect(it.children,p);}else allF.push({n:p,t:'file',s:it.size,e:it.ext});}}
  for(const[d,items]of Object.entries(sk.resources||{})){allF.push({n:d+'/',t:'dir'}); if(Array.isArray(items))collect(items,d);}

  if(allF.length) {
    filesH = '<div style="border:1px solid var(--border);border-radius:var(--radius)">';
    for(const f of allF) {
      filesH += `<div style="display:flex;align-items:center;padding:8px 12px;border-bottom:1px solid rgba(48,54,61,0.3);font-size:13px">
        <span style="margin-right:8px">${f.t==='dir'?'📁':fileIcon(f.e)}</span>
        <span style="flex:1;font-family:var(--font-mono)">${esc(f.n)}</span>
        ${f.s!==undefined?`<span style="color:var(--text-dim);margin-right:12px">${fmtSize(f.s)}</span>`:''}
        ${f.t==='file'?`<button class="btn btn-sm btn-ghost" onclick="editFile('${name}','${f.n}')">✏️</button>`:''}
        <button class="btn btn-sm btn-ghost" style="color:var(--danger)" onclick="delFile('${name}','${f.n}')">🗑️</button></div>`;
    }
    filesH += '</div>';
  } else filesH = '<div style="color:var(--text-dim);text-align:center;padding:20px">暂无资源文件</div>';

  mc.innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:20px">
      <button class="btn" onclick="navigateTo('detail','${name}')">← 返回详情</button>
      <button class="btn btn-success" onclick="saveSkill('${name}')">💾 保存</button>
    </div>
    <div class="tabs" id="eTabs"><div class="tab active" onclick="eTab('info',this)">📋 基本信息</div>
    <div class="tab" onclick="eTab('content',this)">📝 技能内容</div><div class="tab" onclick="eTab('files',this)">📁 文件管理</div></div>
    <div id="eInfo"><div class="card">
      <div class="form-row"><div class="form-group"><label class="form-label">标识名 <span class="required">*</span></label>
      <input class="form-input" id="e_name" value="${esc(sk.name)}" style="font-family:var(--font-mono)"></div>
      <div class="form-group"><label class="form-label">触发描述 <span class="required">*</span></label>
      <textarea class="form-textarea" id="e_desc" rows="3" style="font-family:inherit;min-height:80px">${esc(sk.description)}</textarea></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">中文简述</label><input class="form-input" id="e_zh" value="${esc(sk.description_zh)}"></div>
      <div class="form-group"><label class="form-label">英文简述</label><input class="form-input" id="e_en" value="${esc(sk.description_en)}"></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">允许工具</label><input class="form-input" id="e_tools" value="${esc(sk.allowedTools)}"></div>
      <div class="form-group"><label class="form-label">主页链接</label><input class="form-input" id="e_home" value="${esc(sk.homepage)}"></div></div>
    </div></div>
    <div id="eContent" style="display:none"><div class="code-editor"><div class="code-editor-header"><span>📝 SKILL.md Body</span></div>
    <div id="cmEditBody"></div></div></div>
    <div id="eFiles" style="display:none"><div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div class="section-title" style="margin:0">📁 文件管理</div>
        <div style="display:flex;gap:8px"><button class="btn btn-sm" onclick="addFile('${name}')">📄 新建文件</button>
        <button class="btn btn-sm" onclick="addDir('${name}')">📁 新建目录</button></div></div>
      ${filesH}</div></div>`;

  // Store skill body for CodeMirror lazy init
  S._editSkillBody = sk.body || '';
  S._editBodyCmView = null;
  S._editBodyCmInited = false;
}

function eTab(t,el) { el.parentElement.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));el.classList.add('active');
  document.getElementById('eInfo').style.display=t==='info'?'':'none';
  document.getElementById('eContent').style.display=t==='content'?'':'none';
  document.getElementById('eFiles').style.display=t==='files'?'':'none';
  // Lazy-init CodeMirror when content tab is shown for the first time
  if (t === 'content' && !S._editBodyCmInited) {
    S._editBodyCmInited = true;
    const initCM = () => {
      const wrap = document.getElementById('cmEditBody');
      if (!wrap) return;
      S._editBodyCmView = window.CM.create(wrap, {
        value: S._editSkillBody || '',
        lang: 'markdown',
        minHeight: '400px',
        onChange: (val) => { S._editSkillBody = val; }
      });
    };
    if (window.CM) requestAnimationFrame(initCM);
    else window.addEventListener('cm-ready', () => requestAnimationFrame(initCM), {once:true});
  }
}

async function saveSkill(name) {
  try {
    // Get body from CodeMirror if initialized, otherwise from stored data
    const bodyContent = S._editBodyCmView ? S._editBodyCmView.state.doc.toString() : S._editSkillBody;
    const r = await api.put(`/api/skills/${encodeURIComponent(name)}?dir=${encodeURIComponent(S.currentDir)}`, {
      name:document.getElementById('e_name')?.value, description:document.getElementById('e_desc')?.value,
      description_zh:document.getElementById('e_zh')?.value, description_en:document.getElementById('e_en')?.value,
      allowedTools:document.getElementById('e_tools')?.value, homepage:document.getElementById('e_home')?.value,
      body: bodyContent });
    if(r.error)showToast(r.error,'error'); else{showToast('保存成功','success');await refreshSkills();}
  }catch(e){showToast('保存失败','error');}
}

async function editFile(sk,fp) {
  const d = await api.get(`/api/skills/${encodeURIComponent(sk)}/file?dir=${encodeURIComponent(S.currentDir)}&path=${encodeURIComponent(fp)}`);
  if(d.error){showToast(d.error,'error');return;}
  // Detect language from extension
  const ext = fp.split('.').pop().toLowerCase();
  const langMap = {py:'python',js:'javascript',json:'json',md:'markdown',yaml:'markdown',yml:'markdown',sh:'markdown',txt:'markdown'};
  const lang = langMap[ext] || 'markdown';

  let cmView = null;
  showModal('编辑 ' + fp,
    `<div class="cm-editor-wrap" id="cmEditWrap"></div>`,
    async () => {
      const content = cmView ? cmView.state.doc.toString() : d.content;
      await api.put(`/api/skills/${encodeURIComponent(sk)}/file?dir=${encodeURIComponent(S.currentDir)}`, {path: fp, content});
      showToast('已保存','success');
      navigateTo('edit', sk);
    }
  );

  // Initialize CodeMirror after DOM is ready
  const initCM = () => {
    const wrap = document.getElementById('cmEditWrap');
    if (!wrap) return;
    cmView = window.CM.create(wrap, { value: d.content, lang, minHeight: '400px' });
  };
  if (window.CM) { requestAnimationFrame(initCM); }
  else { window.addEventListener('cm-ready', () => requestAnimationFrame(initCM), {once:true}); }
}

async function delFile(sk,fp) { if(!confirm(`确定删除 ${fp}？`))return; await api.del(`/api/skills/${encodeURIComponent(sk)}/file?dir=${encodeURIComponent(S.currentDir)}&path=${encodeURIComponent(fp)}`);showToast('已删除','success');navigateTo('edit',sk); }
function addFile(sk) {
  let cmView = null;
  showModal('新建文件',
    `<div class="form-group"><label class="form-label">路径</label><input class="form-input" id="nfp" placeholder="scripts/my.py" style="font-family:var(--font-mono)"></div>
     <div class="form-group"><label class="form-label">内容</label><div class="cm-editor-wrap" id="cmNewFileWrap"></div></div>`,
    async () => {
      const p = document.getElementById('nfp').value;
      if (!p) { showToast('请填路径','warning'); return; }
      const content = cmView ? cmView.state.doc.toString() : '';
      await api.put(`/api/skills/${encodeURIComponent(sk)}/file?dir=${encodeURIComponent(S.currentDir)}`, {path: p, content});
      showToast('已创建','success');
      navigateTo('edit', sk);
    }
  );
  const initCM = () => {
    const wrap = document.getElementById('cmNewFileWrap');
    if (!wrap) return;
    cmView = window.CM.create(wrap, { value: '', lang: 'markdown', minHeight: '200px' });
  };
  // Dynamically detect language when path input changes
  const setupLangDetect = () => {
    const nfp = document.getElementById('nfp');
    if (nfp) {
      nfp.addEventListener('blur', () => {
        const ext = nfp.value.split('.').pop().toLowerCase();
        const langMap = {py:'python',js:'javascript',json:'json',md:'markdown'};
        if (langMap[ext] && cmView) {
          // Re-create with correct lang
          const val = cmView.state.doc.toString();
          cmView.destroy();
          const wrap = document.getElementById('cmNewFileWrap');
          if (wrap) { wrap.innerHTML = ''; cmView = window.CM.create(wrap, { value: val, lang: langMap[ext], minHeight: '200px' }); }
        }
      });
    }
  };
  if (window.CM) { requestAnimationFrame(() => { initCM(); setupLangDetect(); }); }
  else { window.addEventListener('cm-ready', () => requestAnimationFrame(() => { initCM(); setupLangDetect(); }), {once:true}); }
}
function addDir(sk) { showModal('新建目录',`<div class="form-group"><label class="form-label">目录路径</label><input class="form-input" id="ndp" placeholder="scripts" style="font-family:var(--font-mono)"></div>`,async()=>{const p=document.getElementById('ndp').value;if(!p){showToast('请填路径','warning');return;}await api.post(`/api/skills/${encodeURIComponent(sk)}/directory?dir=${encodeURIComponent(S.currentDir)}`,{path:p});showToast('已创建','success');navigateTo('edit',sk);}); }

// ============== Actions ==============
async function validateAction(name) {
  const r = await api.post(`/api/skills/${encodeURIComponent(name)}/validate?dir=${encodeURIComponent(S.currentDir)}`);
  const a = document.getElementById('valArea');
  if(!a)return;
  let h = `<div class="validation-result ${r.valid?'valid':'invalid'}">`;
  if(r.valid) h += '<div class="validation-item success">✅ 技能验证通过！</div>';
  for(const e of(r.errors||[]))h+=`<div class="validation-item error">❌ ${esc(e)}</div>`;
  for(const w of(r.warnings||[]))h+=`<div class="validation-item warning">⚠️ ${esc(w)}</div>`;
  a.innerHTML = h+'</div>';
  showToast(r.valid?'验证通过':'验证失败',r.valid?'success':'error');
}

async function packageAction(name) {
  showToast('正在打包...','info');
  const r = await api.post(`/api/skills/${encodeURIComponent(name)}/package?dir=${encodeURIComponent(S.currentDir)}`);
  if(r.error) showToast('打包失败: '+(r.details?.errors?.join(', ')||r.error),'error');
  else showToast(`打包成功！(${fmtSize(r.size)})`,'success');
}

function deployAction(name) {
  const targets = Object.values(S.deployTargets);
  const targetCardsH = targets.map(t => `
    <div class="deploy-target-card selected" data-app="${t.id}" onclick="toggleDeployTarget(this)">
      <div class="target-check">✓</div>
      <div class="target-header">
        <div class="target-icon" style="background:${t.color}22">${t.icon}</div>
        <div><div class="target-name">${t.name}</div><div class="target-desc">${t.description}</div></div>
      </div>
      <div class="target-info"><span>📁 ${t.format === 'skill.md' ? 'SKILL.md 格式' : 'Rules 规则格式'}</span></div>
    </div>`).join('');

  showModal('部署技能', `
    <p style="margin-bottom:16px;color:var(--text-dim)">选择要部署到的目标应用（可多选）</p>
    <div class="deploy-targets">${targetCardsH}</div>
    <div class="form-group"><label class="form-label">部署级别</label>
    <select class="form-select" id="deployLevel" onchange="document.getElementById('projDirGroup').style.display=this.value==='project'?'':'none'">
      <option value="user">用户级（全局可用）</option><option value="project">项目级（仅指定项目）</option></select></div>
    <div class="form-group" id="projDirGroup" style="display:none"><label class="form-label">项目目录</label>
    <input class="form-input" id="projDir" placeholder="/path/to/project" style="font-family:var(--font-mono)"></div>
    <div id="deployActionResult"></div>`,
    async () => {
      const selectedApps = Array.from(document.querySelectorAll('.deploy-target-card.selected')).map(el => el.dataset.app);
      if (!selectedApps.length) { showToast('请至少选择一个目标应用', 'warning'); return; }
      const level = document.getElementById('deployLevel').value;
      const body = { level, sourceDir: S.currentDir, apps: selectedApps };
      if (level === 'project') body.projectDir = document.getElementById('projDir').value;
      
      const r = await api.post(`/api/skills/${encodeURIComponent(name)}/deploy`, body);
      if (r.results) {
        const resultH = r.results.map(res => `
          <div class="deploy-result-card ${res.success ? 'success' : 'fail'}">
            <div class="result-icon">${res.success ? '✅' : '❌'}</div>
            <div class="result-info"><div class="result-app">${res.icon || ''} ${res.appName || res.app}</div>
            <div class="result-path">${res.success ? res.message : res.error}</div></div>
          </div>`).join('');
        document.getElementById('deployActionResult').innerHTML = resultH;
        showToast(r.message, r.success ? 'success' : 'warning');
      } else if (r.error) {
        showToast(r.error, 'error');
      }
    });
}

function toggleDeployTarget(el) {
  el.classList.toggle('selected');
}

async function deleteAction(name) {
  if(!confirm(`⚠️ 确定删除技能 "${name}"？此操作不可撤销！`))return;
  const r = await api.del(`/api/skills/${encodeURIComponent(name)}?dir=${encodeURIComponent(S.currentDir)}`);
  if(r.error)showToast(r.error,'error');else{showToast('已删除','success');await refreshSkills();navigateTo('skills');}
}

// ============== Package Page ==============
function renderPackagePage() {
  document.getElementById('mainContent').innerHTML = `
    <div class="card" style="margin-bottom:20px">
      <div class="section-title">📦 技能打包</div>
      <p style="color:var(--text-dim);margin-bottom:16px">将技能打包为 .skill 文件（ZIP 格式），便于分发和部署</p>
      <div class="form-group"><label class="form-label">选择要打包的技能</label>
      <select class="form-select" id="pkgSkill">${S.skills.map(s=>`<option value="${s.dirName}">${esc(s.displayName)} (${s.dirName})</option>`).join('')}</select></div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-success" onclick="doPkg()">📦 打包</button>
        <button class="btn" onclick="doPkgAll()">📦 打包全部</button>
      </div>
      <div id="pkgResult" style="margin-top:16px"></div>
    </div>
    <div class="card"><div class="section-title">📋 已打包文件</div><div id="pkgList">加载中...</div></div>`;
  loadPkgList();
}

async function doPkg() {
  const name = document.getElementById('pkgSkill').value;
  if(!name){showToast('请选择技能','warning');return;}
  showToast('正在打包 '+name+'...','info');
  const r = await api.post(`/api/skills/${encodeURIComponent(name)}/package?dir=${encodeURIComponent(S.currentDir)}`);
  const el = document.getElementById('pkgResult');
  if(r.error) { el.innerHTML = `<div class="validation-result invalid"><div class="validation-item error">❌ ${esc(r.details?.errors?.join(', ')||r.error)}</div></div>`; }
  else { el.innerHTML = `<div class="validation-result valid"><div class="validation-item success">✅ 打包成功！文件: ${esc(r.file)} (${fmtSize(r.size)})</div></div>`; loadPkgList(); }
}

async function doPkgAll() {
  let ok=0,fail=0;
  for(const s of S.skills){
    const r = await api.post(`/api/skills/${encodeURIComponent(s.dirName)}/package?dir=${encodeURIComponent(S.currentDir)}`);
    if(r.error)fail++;else ok++;
  }
  showToast(`打包完成: ${ok} 成功, ${fail} 失败`, fail?'warning':'success');
  loadPkgList();
}

async function loadPkgList() {
  // Simple: just check dist files via skills that have been packaged
  const el = document.getElementById('pkgList');
  if(!el)return;
  el.innerHTML = `<p style="color:var(--text-dim)">打包后的文件保存在 dist/ 目录中。可通过下方链接下载。</p>
    <div style="margin-top:12px">${S.skills.map(s=>`<div style="display:flex;align-items:center;padding:6px 0;gap:8px">
    <span>📦</span><span style="flex:1">${esc(s.displayName)}</span>
    <a href="/api/download/${encodeURIComponent(s.dirName)}" class="btn btn-sm" download>⬇️ 下载</a></div>`).join('')}</div>`;
}

// ============== Deploy Page ==============
async function renderDeployPage() {
  // Fetch deploy targets with status
  let targetsData = { targets: [] };
  try { targetsData = await api.get('/api/deploy-targets'); } catch(e) {}
  const targets = targetsData.targets || Object.values(S.deployTargets).map(t=>({...t, userDirExists:false, skillCount:0}));

  document.getElementById('mainContent').innerHTML = `
    <div class="card" style="margin-bottom:20px">
      <div class="section-title">🎯 部署目标</div>
      <p style="color:var(--text-dim);margin-bottom:16px">选择要部署到的应用平台（支持同时部署到多个目标）</p>
      <div class="deploy-targets">
        ${targets.map(t => `
          <div class="deploy-target-card selected" data-app="${t.id}" onclick="toggleDeployTarget(this)">
            <div class="target-check">✓</div>
            <div class="target-header">
              <div class="target-icon" style="background:${t.color}22">${t.icon}</div>
              <div><div class="target-name">${t.name}</div><div class="target-desc">${t.description}</div></div>
            </div>
            <div class="target-info">
              <span>${t.userDirExists ? '✅ 已安装' : '⚪ 未检测到'}</span>
              <span>📦 ${t.skillCount || 0} 个技能</span>
              <span>📄 ${t.format === 'skill.md' ? 'SKILL.md' : 'Rules'}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card" style="margin-bottom:20px">
      <div class="section-title">🧩 选择技能</div>
      <p style="color:var(--text-dim);margin-bottom:16px">勾选要部署的技能</p>
      <div style="display:flex;flex-direction:column;gap:8px" id="deployList">
        ${S.skills.map(s => `
          <label style="display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--border);border-radius:6px;cursor:pointer;transition:var(--transition)" 
            onmouseenter="this.style.borderColor='var(--text-dim)'" onmouseleave="this.style.borderColor='var(--border)'">
            <input type="checkbox" value="${s.dirName}" checked style="width:16px;height:16px;accent-color:var(--accent)">
            <span class="skill-card-icon" style="width:32px;height:32px;font-size:16px;border-radius:6px">🧩</span>
            <div style="flex:1"><div style="font-weight:500">${esc(s.displayName)}</div>
            <div style="font-size:12px;color:var(--text-dim)">${esc(s.description_zh || s.description || '').substring(0, 60)}</div></div>
            <span style="font-size:12px;color:var(--text-dim)">${fmtSize(s.size)}</span>
          </label>`).join('')}
      </div>
      ${S.skills.length === 0 ? '<div style="color:var(--text-dim);text-align:center;padding:20px">暂无可部署的技能</div>' : ''}
    </div>

    <div class="card" style="margin-bottom:20px">
      <div class="section-title">⚙️ 部署设置</div>
      <div class="form-group"><label class="form-label">部署级别</label>
        <select class="form-select" id="batchLevel" onchange="document.getElementById('batchProjDir').style.display=this.value==='project'?'':'none'">
          <option value="user">用户级（全局生效）</option><option value="project">项目级（指定项目）</option></select></div>
      <div class="form-group" id="batchProjDir" style="display:none">
        <label class="form-label">项目目录</label>
        <div style="display:flex;gap:8px">
          <input class="form-input" id="batchProjPath" placeholder="/path/to/project" style="font-family:var(--font-mono);font-size:12px">
          <button class="btn btn-sm" onclick="browseBatchProj()">📂 浏览</button>
        </div>
      </div>
      <button class="btn btn-success btn-lg" onclick="batchDeploy()" style="width:100%;justify-content:center;margin-top:8px">🚀 开始部署</button>
    </div>

    <div id="deployResult" style="margin-bottom:20px"></div>

    <div class="card"><div class="section-title">📍 部署路径说明</div>
    <table style="width:100%;font-size:13px">
      ${targets.map(t => `
        <tr>
          <td style="padding:8px">${t.icon} ${t.name}</td>
          <td style="padding:8px;font-family:var(--font-mono);font-size:12px">${t.userDir ? t.userDir.replace(S.config.homeDir, '~') : '-'}</td>
          <td style="padding:8px;color:var(--text-dim)">${t.format === 'skill.md' ? 'SKILL.md 原生格式' : '自动转换为 Rules 规则'}</td>
        </tr>`).join('')}
    </table></div>`;
}

async function browseBatchProj() {
  let curPath = document.getElementById('batchProjPath')?.value || S.config.homeDir || os.homedir;
  const browse = async (p) => {
    const d = await api.post('/api/browse', {path:p});
    curPath = d.current;
    let h = `<div class="dir-browser"><div class="dir-browser-header"><span>📂</span><span style="font-family:var(--font-mono);font-size:12px">${esc(d.current)}</span></div>`;
    if(d.parent!==d.current) h+=`<div class="dir-item" onclick="updateBatchProj('${d.parent}')">📁 ..</div>`;
    for(const it of d.items) h+=`<div class="dir-item" onclick="updateBatchProj('${it.path}')">📁 ${esc(it.name)}</div>`;
    h+='</div>';
    document.getElementById('batchProjBrowser').innerHTML = h;
  };
  window.updateBatchProj = async (p) => { await browse(p); };
  showModal('选择项目目录', '<div id="batchProjBrowser">加载中...</div>', () => {
    document.getElementById('batchProjPath').value = curPath;
  });
  await browse(curPath);
}

async function batchDeploy() {
  const checks = document.querySelectorAll('#deployList input:checked');
  const names = Array.from(checks).map(c => c.value);
  if (!names.length) { showToast('请选择至少一个技能', 'warning'); return; }

  const selectedApps = Array.from(document.querySelectorAll('.deploy-target-card.selected')).map(el => el.dataset.app);
  if (!selectedApps.length) { showToast('请选择至少一个部署目标', 'warning'); return; }

  const level = document.getElementById('batchLevel').value;
  const projPath = document.getElementById('batchProjPath')?.value;

  // Show progress
  const resultEl = document.getElementById('deployResult');
  const total = names.length;
  resultEl.innerHTML = `
    <div class="card">
      <div class="section-title">⏳ 正在部署...</div>
      <div class="deploy-progress"><div class="deploy-progress-bar" id="deployProgressBar" style="width:0%"></div></div>
      <div id="deployProgressText" style="text-align:center;font-size:13px;color:var(--text-dim)">0 / ${total}</div>
      <div id="deployResultList" style="margin-top:16px"></div>
    </div>`;

  let completed = 0;
  const allResults = [];

  for (const n of names) {
    const body = { level, sourceDir: S.currentDir, apps: selectedApps };
    if (level === 'project') body.projectDir = projPath;
    
    const r = await api.post(`/api/skills/${encodeURIComponent(n)}/deploy`, body);
    completed++;
    
    const pct = Math.round((completed / total) * 100);
    document.getElementById('deployProgressBar').style.width = pct + '%';
    document.getElementById('deployProgressText').textContent = `${completed} / ${total}`;

    if (r.results) {
      allResults.push(...r.results.map(res => ({ ...res, skillName: n })));
    }
  }

  // Render final results
  const successCount = allResults.filter(r => r.success).length;
  const failCount = allResults.filter(r => !r.success).length;

  let resultH = `<div class="card">
    <div class="section-title">${failCount === 0 ? '✅ 部署完成' : '⚠️ 部署完成（部分失败）'}</div>
    <div style="display:flex;gap:16px;margin-bottom:16px">
      <div class="stat-card" style="flex:1;border:0;padding:12px"><div class="stat-icon green" style="width:36px;height:36px;font-size:16px">✅</div><div><div class="stat-value" style="font-size:20px">${successCount}</div><div class="stat-label">成功</div></div></div>
      ${failCount > 0 ? `<div class="stat-card" style="flex:1;border:0;padding:12px"><div class="stat-icon" style="width:36px;height:36px;font-size:16px;background:var(--danger-bg)">❌</div><div><div class="stat-value" style="font-size:20px">${failCount}</div><div class="stat-label">失败</div></div></div>` : ''}
    </div>`;

  // Group by app
  const byApp = {};
  for (const r of allResults) {
    const key = r.app || 'unknown';
    if (!byApp[key]) byApp[key] = [];
    byApp[key].push(r);
  }

  for (const [appId, results] of Object.entries(byApp)) {
    const appTarget = S.deployTargets[appId] || {};
    resultH += `<div style="margin-bottom:12px"><div style="font-size:14px;font-weight:500;margin-bottom:8px">${appTarget.icon || '📦'} ${appTarget.name || appId}</div>`;
    for (const r of results) {
      resultH += `<div class="deploy-result-card ${r.success ? 'success' : 'fail'}">
        <div class="result-icon">${r.success ? '✅' : '❌'}</div>
        <div class="result-info"><div class="result-app">${r.skillName || ''}</div>
        <div class="result-path">${r.success ? r.targetPath || r.message : r.error}</div></div>
      </div>`;
    }
    resultH += '</div>';
  }
  resultH += '</div>';

  resultEl.innerHTML = resultH;
  showToast(`部署完成: ${successCount} 成功${failCount > 0 ? `, ${failCount} 失败` : ''}`, failCount ? 'warning' : 'success');
}

// ============== Dir Browser ==============
async function showDirBrowser() {
  let curPath = S.currentDir;
  const browse = async (p) => {
    const d = await api.post('/api/browse', {path:p});
    curPath = d.current;
    let h = `<div class="dir-browser"><div class="dir-browser-header"><span>📂</span>
      <input value="${esc(d.current)}" id="dirInput" onkeydown="if(event.key==='Enter')this.blur()" style="font-family:var(--font-mono);font-size:12px"></div>`;
    if(d.parent!==d.current) h+=`<div class="dir-item" onclick="updateBrowser('${d.parent}')">📁 ..</div>`;
    for(const it of d.items) h+=`<div class="dir-item" onclick="updateBrowser('${it.path}')">📁 ${esc(it.name)}</div>`;
    h+='</div>';
    document.getElementById('dirBrowserContent').innerHTML = h;
  };
  window.updateBrowser = async (p) => { await browse(p); };
  showModal('选择技能目录', '<div id="dirBrowserContent">加载中...</div>', async()=>{
    const input = document.getElementById('dirInput');
    S.currentDir = input ? input.value : curPath;
    S.currentApp = 'custom';
    document.getElementById('dirSwitcherIcon').textContent = '📂';
    document.getElementById('dirSwitcherLabel').textContent = '自定义';
    document.querySelectorAll('.dir-switcher-item[data-app]').forEach(el => el.classList.remove('active'));
    document.getElementById('currentDir').textContent = S.currentDir.replace(S.config.homeDir,'~');
    await refreshSkills();
    showToast('已切换到 '+S.currentDir,'success');
  });
  await browse(curPath);
}

async function browseTgt() {
  let curPath = S.wizardData.targetDir || S.currentDir;
  const browse = async (p) => {
    const d = await api.post('/api/browse', {path:p});
    curPath = d.current;
    let h = `<div class="dir-browser"><div class="dir-browser-header"><span>📂</span><span style="font-family:var(--font-mono);font-size:12px">${esc(d.current)}</span></div>`;
    if(d.parent!==d.current) h+=`<div class="dir-item" onclick="updateTgt('${d.parent}')">📁 ..</div>`;
    for(const it of d.items) h+=`<div class="dir-item" onclick="updateTgt('${it.path}')">📁 ${esc(it.name)}</div>`;
    h+='</div>';
    document.getElementById('tgtBrowserContent').innerHTML = h;
  };
  window.updateTgt = async (p) => { await browse(p); };
  showModal('选择创建位置', '<div id="tgtBrowserContent">加载中...</div>', ()=>{
    S.wizardData.targetDir = curPath;
    document.getElementById('w_target').value = curPath;
  });
  await browse(curPath);
}

// Init
document.addEventListener('DOMContentLoaded', init);
