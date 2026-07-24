<div align="center">

# 🚀 lander-new

**把 GitHub 仓库稳定转化为可运行、可部署、可导入的项目**

[English](README.en.md) · [安装](#-安装) · [更新](#update) · [使用方式](#-使用方式)

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

## 🎓 项目部署顾问

`lander-new` 面向的是不熟悉项目开发和服务器部署的用户：把一个陌生 GitHub 项目交给 Agent 后，先快速看懂它是什么、适合跑在哪里，再按确认过的路线完成安装、部署、验证和交接。

它适合配合 Agent 使用，而不是替代 Agent 成为“万能部署器”。你可以给它 GitHub 仓库、产品官网或官方文档页；它会先做浅层识别，说明项目用途、官方入口、建议环境、部署难度和明显风险，再询问是否继续。

它更像项目部署顾问，而不是自动施工队：先看懂项目、判断路线、提醒风险，再在你确认后协助 Agent 稳定推进部署。

**工作方式**

- 🔎 **浅层识别**

  先阅读 README、官方 docs、快速开始、安装、配置和安全相关入口，输出一句话介绍、官方来源、建议路线、环境要求和明显风险。

- 🧭 **语义分流**

  根据项目证据和用户目标选择轻量路线或服务路线；完成分类后只读取一个主要路线和实际命中的条件规则，不把所有仓库都套成同一种部署流程。

- ✅ **确认后执行**

  即使用户一开始就要求部署，也先完成只读识别并征求确认；确认后再按阶段推进安装、配置、访问、验证和交接。

- ⚖️ **自适应深度**

  简单、低风险项目走最短闭环；多组件、公网访问、账号初始化、支付、Webhook、证书或生产环境相关任务才展开更完整的检查和确认。

- 🔐 **敏感配置预警**

  主动留意环境变量、API Key、Token、账号密码、私钥、默认凭据、调试模式和生产切换要求。Agent 只说明变量名、用途和填写位置，不要求在对话中粘贴真实值。

- 🖥️ **环境预检**

  在远程主机或长期运行环境上，先检查 CPU、内存、磁盘、Docker、端口、代理、证书体系和已有服务，再决定是否进入修改阶段。

- 📝 **交接简报**

  部署或安装完成后，交代访问入口、账号状态、管理命令、凭据处理方式、后续维护和撤销路径。普通报告不记录明文密码，临时凭据只在当前私密对话中按需提供。

**更适合这些仓库**

- 🐳 **Docker / Compose 自托管服务**

  适合 API 服务、Web App、数据库配套服务和个人工具。启动前检查 Compose、端口、挂载、权限、持久化和秘密注入；启动后验证容器健康和应用响应。

- 🌐 **Web 服务、后端服务和全栈应用**

  适合官方文档明确说明运行入口、依赖和配置方式的项目。`lander-new` 会根据目标环境选择本机、Docker、VPS 或项目支持的其他方式。

- 📌 **VPS 长期运行服务**

  适合需要公网入口、HTTPS、反向代理、DNS、证书续签和已有站点共存的服务。执行前确认现有入口和证书体系，避免影响无关服务。

- 🧰 **脚本安装 / 面板管理项目**

  适合提供安装脚本、管理命令、交互菜单或后台面板的项目。`lander-new` 会在交接时说明访问入口、账号状态、凭据来源、管理命令和后续维护方式。

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

<a id="update"></a>

## ♻️ 更新

如果 GitHub 仓库中的 `lander-new` 有新版本，并且你之前按全局方式安装，在终端执行：

```powershell
npx skills@latest update lander-new -g
```

Skills CLI 会重新获取来源仓库，并更新本机已安装的 Skill 文件。更新后如果 Agent 没有立即发现新版本，请重启目标 Agent 或新建任务。

如果你之前安装到某个项目目录，请进入该项目后执行：

```powershell
npx skills@latest update lander-new
```

## 💬 使用方式

使用自然语言即可，不需要记固定句式。`/lander-new` 后面可以直接跟 GitHub 仓库、产品官网或官方文档页：

```text
/lander-new https://github.com/author/repository
```

```text
/lander-new https://project.example.com
```

第一轮只做浅层识别：说明项目用途、官方入口、建议路线、建议环境和风险点，然后询问是否继续安装或部署。即使你第一句话已经要求部署，`lander-new` 也会先完成这一轮确认，再进入后续执行。

也可以不用显式命令，直接用自然语言描述需求。只要任务涉及 GitHub 项目的识别、安装、部署、验证或导入，Agent 可以根据 Skill 描述选择 `lander-new`。

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
