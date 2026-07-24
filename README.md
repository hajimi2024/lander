<div align="center">

# 🚀 lander-new

**把 GitHub 仓库稳定转化为可运行、可部署、可导入的项目**

[English](README.en.md) · [安装](#-安装) · [更新](#-更新) · [使用方式](#-使用方式)

</div>

```text
██╗      █████╗ ███╗   ██╗██████╗ ███████╗██████╗
██║     ██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗
██║     ███████║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
██║     ██╔══██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
███████╗██║  ██║██║ ╚████║██████╔╝███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

──●────●────●────●────●────●──
   lander-new • AI Skills for Codex • Cursor • Grok Build
```

![lander-new Agent Skill](https://img.shields.io/badge/lander--new-Agent_Skill-d1008f?style=flat-square)
![GitHub Repository Analysis](https://img.shields.io/badge/GitHub-Repository_Analysis-168aad?style=flat-square)
![Deployment Targets](https://img.shields.io/badge/Targets-Local_%E2%80%A2_WSL2_%E2%80%A2_VPS-16a34a?style=flat-square)
![Deployment Routes](https://img.shields.io/badge/Routes-Docker_%E2%80%A2_Compose_%E2%80%A2_Native-0891b2?style=flat-square)
![Guided Workflow](https://img.shields.io/badge/Workflow-Guided_Deployment-d97706?style=flat-square)
![Security Preflight](https://img.shields.io/badge/Security-Preflight_First-b91c1c?style=flat-square)
![Single Skill](https://img.shields.io/badge/Repository-Single_Skill-4f46e5?style=flat-square)

---

## ✨ 能做什么

`lander-new` 为 Agent 提供一套面对陌生 GitHub 仓库时的研判与执行流程。

它先识别项目形态和官方使用方式，再根据目标环境选择路线，最后完成配置、执行、访问、验证和交接。第一轮只分析，不会直接安装依赖、连接服务器或修改环境。

`lander-new` 默认从轻量流程开始：简单且低风险的项目只保留必要步骤；复杂度上升时才扩展分析流程，出现敏感信息时则独立加载对应的安全检查。

完成识别后，它只读取一个主要路线和实际命中的条件规则，不会为简单项目通读服务器部署、证书或长期运维文档。

**工作方式**

- 🔎 **仓库研判**

  读取 README、官方 docs、安装说明、Compose、Dockerfile、包管理清单和环境样例，判断项目类型、官方入口、主要依赖和资源级别。

- 🧭 **路线选择**

  只在官方支持的方案中选择路径。优先采用依赖较少、操作稳定、风险较低且适合目标环境的方式；直接使用已经满足目标时，不默认进入开发或构建流程。

- ⚖️ **自适应深度**

  根据任务复杂度和操作风险采用轻量、标准或增强流程。仓库规模不直接决定流程深度；简单项目涉及秘密、付费权限或公网时仍执行对应安全检查。

- 🔐 **敏感配置预警**

  识别官方资料中要求的环境变量、API Key、Token、账号密码、私钥、默认凭据和生产配置。Agent 只说明变量名、用途和填写位置，不要求在对话中粘贴真实值。

- 🖥️ **环境预检**

  在远程主机或长期运行环境上，先检查 CPU、内存、磁盘、Docker、端口、代理和证书体系，再决定是否进入修改阶段。

- ✅ **阶段验证**

  按实际路线验证结果：CLI 检查命令和最小功能，导入项目检查目标应用识别，运行服务再检查进程、容器、端口、应用响应和适用的持久化。

- 📝 **交接简报**

  所有任务都会给出简洁的结果和使用方式；修改了环境时再说明撤销方法，实际部署或长期运行任务再生成默认私有、经过脱敏的维护记录。

**更适合这些仓库**

- 🐳 **Docker / Compose 自托管服务**

  适合 API 服务、Web App、数据库配套服务和个人工具。启动前检查 Compose、端口、挂载、权限、持久化和秘密注入；启动后验证容器健康和应用响应。

- 🌐 **Web 服务、后端服务和全栈应用**

  适合官方文档明确说明运行入口、依赖和配置方式的项目。`lander-new` 会根据目标环境选择本机、Docker、VPS 或项目支持的其他方式。

- 📌 **VPS 长期运行服务**

  适合需要公网入口、HTTPS、反向代理、DNS-01、续签迁移和已有站点共存的服务。执行前确认现有入口和证书体系，避免影响无关服务。

- 💻 **本机试运行项目**

  适合先在当前电脑或 WSL2 中运行的小型服务、CLI 和开发工具。`lander-new` 会先确认官方命令和所需环境，再进入安装或启动阶段。

- 🧩 **Agent / MCP / 浏览器扩展 / CLI 工具**

  适合具有明确官方安装入口的工具型仓库。`lander-new` 负责识别安装位置、官方命令和最小验证方式，不把普通附件或手工上传项目包装成服务器部署任务。

`SKILL.md` 保持为调度入口：先完成项目分类，再在轻量路线或服务路线中选择一个，并按需叠加敏感信息、公网访问、Web 栈共存、脚本交接和部署记录规则。

## 📦 安装

在终端执行：

```powershell
npx github:hajimi2024/lander-new
```

随后进入官方 Skills CLI。它会读取仓库、识别 `lander-new`，并根据当前环境确认目标 Agent、安装范围和安装方式。仓库仍为私有状态时，请确保当前电脑已配置拥有该仓库访问权限的 GitHub 凭据。

## 🧭 交互选择

官方 Skills CLI 会根据当前环境决定哪些步骤需要询问：

- **Skill**：仓库只有一个 `lander-new`，发现后直接使用。
- **Agent**：检测到多个 Agent 时显示选择列表；只检测到一个时可能直接选中。完整支持列表由 Skills CLI 维护。
- **Scope**：未通过参数预先指定且目标 Agent 支持全局安装时，询问 Project / Global。
- **Method**：多个不同安装目录需要分发时，询问 Symlink / Copy；单一目录时可能直接使用 Copy。

因此，实际界面会随电脑上已安装的 Agent 和用户选择而变化。

## ♻️ 更新

如果 GitHub 仓库中的 `lander-new` 有新版本，在终端执行：

```powershell
npx skills@latest update lander-new
```

未指定范围时，Skills CLI 会根据当前环境处理或询问 Project / Global。更新后如果 Agent 没有立即发现新版本，请重启目标 Agent 或新建任务。

## 💬 使用方式

显式调用：

```text
/lander-new 分析并部署 https://github.com/owner/repository
```

只做识别和规划：

```text
/lander-new 检查 https://github.com/owner/repository，第一轮只分析，不修改环境。
```

部署到 VPS，并先做只读检查：

```text
/lander-new 将 https://github.com/owner/repository 部署到我的 VPS，并先执行只读环境检查。
```

也可以直接用自然语言描述需求。只要任务涉及 GitHub 项目的识别、安装、部署、验证或导入，Agent 可以根据 Skill 描述选择 `lander-new`。

## 🛡️ 安全边界

- 不猜测密码、Token、API Key、域名、路径、访问范围或付费服务。
- 不要求用户在对话中发送真实秘密；误发后提醒立即撤销或轮换。
- “仅检查”阶段保持只读，不修改目标环境。
- 默认凭据未处理、调试模式未关闭或管理入口未保护时，不开放公网。
- 不擅自关闭防火墙、停止全部容器、删除证书或替换现有代理/证书体系。
- 部署记录默认私有，不自动提交到 GitHub、Issue、PR、Release 或 CI 制品。
- 公开分享时保留私有原件，另行生成再次脱敏的副本。

## 🗂️ 目录结构

这是一个单 Skill 仓库，根目录 `SKILL.md` 是可安装入口。终端包装器只提供动画并转交官方 Skills CLI，不改变 Skill 发现结构。

```text
lander-new/
├── SKILL.md
├── README.md
├── README.en.md
├── agents/
├── assets/templates/
├── bin/
│   └── lander-new.mjs
├── references/
│   ├── project-routing.md
│   ├── lightweight-routes.md
│   ├── service-routes.md
│   ├── script-installer-handoff.md
│   ├── secret-safety.md
│   ├── security-and-access.md
│   ├── managed-web-stack-conflicts.md
│   └── artifact-contracts.md
├── scripts/
│   └── preflight.sh
├── tests/
└── package.json
```

## 📄 License

当前仓库尚未选择 License。在明确授权协议前，请不要默认将它视为可自由再分发的软件。
