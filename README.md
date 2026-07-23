<div align="center">

# 🚀 lander

**把 GitHub 仓库稳定落地为可运行、可部署、可导入的项目**

[English](README.en.md) · [Skills CLI](https://github.com/vercel-labs/skills) · [安装](#-安装) · [使用方式](#-使用方式)

</div>

---

## ✨ 能做什么

`lander` 面向的是一个常见但容易失控的场景：你给 Agent 一个 GitHub 仓库，它需要先弄清楚项目是什么、官方推荐怎么使用、应该落在哪类环境里，然后再进入安装、配置、验证和交接。

它的核心能力是把“读仓库”和“动环境”分开处理：先用官方资料完成判断，再按确认过的路线逐步推进，避免一上来就安装依赖、拉镜像、改服务器或暴露服务。

- 🔎 **仓库研判**：读取 README、安装说明、Compose、Dockerfile、包管理清单和环境示例，判断项目是应用、服务、CLI、模板、插件、Skill、MCP 还是浏览器扩展。
- 🧭 **路线选择**：在官方支持的方案中选择依赖更少、操作更稳、风险更低的路径；能直接使用时，不默认进入开发或构建流程。
- 🧩 **多场景落地**：根据项目证据路由到本机、WSL2、远程 Linux、VPS、Docker/Compose、原生安装或可导入制品的处理方式。
- 🖥️ **环境预检**：在远程主机或长期运行环境上，先做 CPU、内存、磁盘、Docker、端口、代理和证书体系的只读检查。
- 🌐 **访问与证书共存**：处理 SSH 隧道、公网入口、反向代理、HTTPS、DNS-01、续签迁移和已有站点共存，避免误伤现有服务。
- ✅ **阶段验证**：每一步执行后验证真实结果，包括进程、容器、端口、HTTP/API 响应、数据持久化和现有服务健康状态。
- 📝 **交接记录**：在合适节点生成简洁、默认私有、经过脱敏的部署记录，便于后续维护，但不自动发布到 GitHub 或公开渠道。

`SKILL.md` 保持轻量，只负责主流程和条件路由；具体细节放在一级 `references/` 文件中，按需加载。

## 📦 安装

使用 Skills CLI 进入交互式安装流程：

```powershell
npx skills@latest add hajimi2024/lander -g
```

安装后，如果 Agent 没有立即发现新 Skill，请重启目标 Agent 或新建任务。

## 🧭 交互选择

安装时 Skills CLI 会引导你选择：

- **Skill**：选择 `lander`。
- **Agent**：选择你实际使用的 Agent，例如 `codex`、`claude-code`、`cursor`、`opencode`。完整列表以 Skills CLI 当前交互为准。
- **Scope**：默认推荐 Global，因为 `lander` 常用于跨项目分析、安装和部署；只有需要把 Skill 固定在某个仓库里时，才选择 Project。
- **Method**：默认推荐 Symlink，方便后续更新；如果系统不支持软链接、你需要固定快照，或准备团队交付，则选择 Copy。

## 💬 使用方式

显式调用：

```text
/lander 分析并部署 https://github.com/owner/repository
```

只做识别和规划，不修改环境：

```text
/lander 检查 https://github.com/owner/repository，第一轮只分析，不修改环境。
```

部署到 VPS，并先做只读环境检查：

```text
/lander 将 https://github.com/owner/repository 部署到我的 VPS，并先执行只读环境检查。
```

也可以直接用自然语言描述需求。只要任务涉及 GitHub 项目的识别、安装、部署、验证或导入，Agent 可以自动选择 `lander`。

## 🛡️ 安全边界

- 不猜测密码、Token、API Key、域名、目标路径或付费服务选择。
- “仅检查”阶段视为只读，不修改目标环境。
- 不擅自关闭防火墙、停止全部容器、删除证书或替换现有代理/证书体系。
- 部署记录默认保存在本地私有位置，不自动提交到 GitHub、Issue、PR、Release 或 CI 制品。
- 需要公开分享部署资料时，先保留私有原件，再生成经过再次脱敏的公开副本。

## 🗂️ 目录结构

这是一个单 Skill 仓库，根目录 `SKILL.md` 就是可安装入口。

```text
lander/
├── SKILL.md
├── README.md
├── README.en.md
├── agents/
│   └── openai.yaml
├── references/
├── scripts/
│   └── preflight.sh
└── assets/
    └── templates/
```

## 📄 License

当前仓库尚未选择 License。在明确授权协议前，请不要默认将它视为可自由再分发的软件。
