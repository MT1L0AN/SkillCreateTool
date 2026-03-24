# Skill Creator Tool — 部署与操作指南

> CodeBuddy 本地 Skill 创建、管理、打包与部署工具

---

## 一、项目概述

Skill Creator Tool 是一个基于 **H5 + Node.js** 的本地 Web 工具，用于可视化地创建、管理、打包和部署 CodeBuddy/WorkBuddy 技能（Skills）。

### 核心功能

| 功能 | 说明 |
|------|------|
| 📊 仪表盘 | 技能总览、统计数据、快捷操作 |
| 🧩 技能列表 | 查看、搜索、筛选所有已安装技能 |
| ✨ 创建向导 | 5 步向导式创建新技能（模板选择 → 信息填写 → 内容编辑 → 目录配置 → 确认创建） |
| ✏️ 技能编辑 | 编辑基本信息、SKILL.md 内容、文件管理 |
| ✅ 技能验证 | 检查 frontmatter 格式、必填字段、命名规范 |
| 📦 打包 | 将技能打包为 `.skill` 文件（ZIP 格式） |
| 🚀 部署 | 一键部署到用户级或项目级 CodeBuddy 目录 |
| 📂 目录浏览 | 支持自主选择技能创建/管理目录 |

---

## 二、快速部署

### 环境要求

- **Node.js** ≥ 16.x
- **npm** ≥ 7.x

### 安装步骤

```bash
# 1. 进入项目目录
cd /path/to/SkillCreateTool

# 2. 安装依赖
npm install

# 3. 启动服务
npm start

# 服务默认运行在 http://localhost:9527
```

### 访问

打开浏览器访问 **http://localhost:9527** 即可使用。

---

## 三、项目结构

```
SkillCreateTool/
├── server.js              # 后端服务（Express）
├── package.json           # 项目配置
├── public/                # 前端静态文件
│   ├── index.html         # H5 入口页面
│   ├── style.css          # 样式文件
│   └── app.js             # 前端逻辑
├── dist/                  # 打包输出目录（自动创建）
└── README.md              # 本文档
```

---

## 四、操作指南

### 4.1 创建技能

1. 点击左侧导航 **✨ 创建技能**
2. **步骤 1 - 选择模板**：选择合适的模板（空白/工作流/工具集成/API集成/规范指南）
3. **步骤 2 - 基本信息**：
   - **目录名称**：技能文件夹名（支持中文）
   - **标识名 (name)**：必须是 `hyphen-case` 格式（如 `my-skill`）
   - **触发描述 (description)**：系统根据此描述判断何时触发技能
   - 其他可选字段
4. **步骤 3 - 技能内容**：编辑 SKILL.md 正文（Markdown），可使用快捷插入按钮
5. **步骤 4 - 目录配置**：选择创建位置和资源子目录
6. **步骤 5 - 确认创建**：检查信息无误后点击创建

### 4.2 管理技能

- **技能列表**：查看所有技能，支持搜索
- **技能详情**：点击技能卡片查看完整信息、资源目录、SKILL.md 预览
- **编辑技能**：修改基本信息、编辑内容、管理文件（新建/编辑/删除）

### 4.3 验证技能

在技能详情页点击 **✅ 验证**，系统会检查：

- SKILL.md 是否存在
- YAML frontmatter 格式是否正确
- 必填字段 `name` 和 `description` 是否完整
- `name` 是否符合 hyphen-case 规范（小写+数字+连字符）
- `description` 是否超长或包含非法字符
- 是否存在未完成的 TODO 标记

### 4.4 打包技能

1. 进入 **📦 打包发布** 页面
2. 选择要打包的技能
3. 点击 **打包**，生成 `.skill` 文件（ZIP 格式）
4. 打包后的文件存放在 `dist/` 目录，可下载分享

### 4.5 部署到 CodeBuddy

#### 单个部署
在技能详情页点击 **🚀 部署**，选择部署级别：
- **用户级**：部署到 `~/.workbuddy/skills/`，所有项目可用
- **项目级**：部署到 `{project}/.workbuddy/skills/`，仅当前项目可用

#### 批量部署
进入 **🚀 部署管理** 页面，勾选技能后批量部署。

### 4.6 切换技能目录

- 点击顶部 **📂 切换目录** 按钮
- 浏览文件系统并选择目标目录
- 或直接输入路径

---

## 五、Skill 规范说明

### 目录结构

```
skill-name/
├── SKILL.md              (必需) — YAML frontmatter + Markdown 指令
├── _skillhub_meta.json   (必需) — 元数据
└── 可选资源/
    ├── scripts/          — 可执行脚本 (Python/Shell)
    ├── references/       — 参考文档 (API文档/指南)
    ├── assets/           — 输出资产 (模板/图片)
    ├── hooks/            — 钩子配置 (hooks.json)
    └── tools/            — 工具集合
```

### SKILL.md 格式

```yaml
---
name: my-skill                      # 必需：hyphen-case 标识名
description: "技能描述..."           # 必需：触发描述
description_zh: "中文简述"           # 可选
description_en: "English brief"      # 可选
allowed-tools: Bash,Read,Glob,Grep   # 可选：限制允许使用的工具
homepage: https://example.com        # 可选
metadata: {}                         # 可选
---

# 技能标题

Markdown 格式的技能指令内容...
```

### _skillhub_meta.json 格式

```json
{
  "name": "技能显示名称",
  "installedAt": 1774266900695,
  "source": "local"
}
```

---

## 六、API 接口文档

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/config` | 获取配置信息 |
| GET | `/api/skills?dir=` | 获取技能列表 |
| GET | `/api/skills/:name?dir=` | 获取技能详情 |
| POST | `/api/skills` | 创建新技能 |
| PUT | `/api/skills/:name?dir=` | 更新技能 |
| DELETE | `/api/skills/:name?dir=` | 删除技能 |
| POST | `/api/skills/:name/validate?dir=` | 验证技能 |
| POST | `/api/skills/:name/package?dir=` | 打包技能 |
| POST | `/api/skills/:name/deploy` | 部署技能 |
| GET | `/api/skills/:name/file?path=` | 读取文件 |
| PUT | `/api/skills/:name/file` | 写入文件 |
| DELETE | `/api/skills/:name/file?path=` | 删除文件 |
| POST | `/api/skills/:name/directory` | 创建目录 |
| POST | `/api/browse` | 浏览文件系统 |
| GET | `/api/download/:name` | 下载打包文件 |

---

## 七、常见问题

### Q: 端口被占用怎么办？
修改 `server.js` 中的 `PORT` 变量，或启动时设置环境变量：
```bash
PORT=8080 npm start
```

### Q: 如何让其他设备访问？
服务默认监听所有网络接口，局域网内其他设备可通过 `http://你的IP:9527` 访问。

### Q: 部署后 CodeBuddy 没有识别到新技能？
重启 CodeBuddy 或等待其自动扫描技能目录。确认技能已正确部署到 `~/.workbuddy/skills/` 目录下。

### Q: 如何备份技能？
使用打包功能将技能打包为 `.skill` 文件保存即可。需要恢复时通过部署功能导入。
