<div align="center">

# 🚀 lander

**Turn a GitHub repository into a runnable, deployable, or importable project through a controlled workflow**

[简体中文](README.md) · [Install](#-install) · [Update](#update) · [Usage](#-usage)

</div>

```text
██╗      █████╗ ███╗   ██╗██████╗ ███████╗██████╗
██║     ██╔══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗
██║     ███████║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
██║     ██╔══██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
███████╗██║  ██║██║ ╚████║██████╔╝███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

─────●─────────────●─────────────●────────●───────●───────
• Lander • Any Agent Skills  • Codex • Cursor • Grok
```

![lander Agent Skill](https://img.shields.io/badge/lander-Agent_Skill-d1008f?style=flat-square)
![GitHub Repository Analysis](https://img.shields.io/badge/GitHub-Repository_Analysis-168aad?style=flat-square)
![Deployment Targets](https://img.shields.io/badge/Targets-Local_%E2%80%A2_WSL2_%E2%80%A2_VPS-16a34a?style=flat-square)
![Deployment Routes](https://img.shields.io/badge/Routes-Docker_%E2%80%A2_Compose_%E2%80%A2_Native-0891b2?style=flat-square)
![Guided Workflow](https://img.shields.io/badge/Workflow-Guided_Deployment-d97706?style=flat-square)
![Security Preflight](https://img.shields.io/badge/Security-Preflight_First-b91c1c?style=flat-square)
![Single Skill](https://img.shields.io/badge/Repository-Single_Skill-4f46e5?style=flat-square)

---

## 🎓 Project Deployment Advisor

`lander` is for users who are not yet comfortable reading development projects or running server deployments. Give an agent an unfamiliar GitHub project, and it helps the agent quickly explain what the project is, where it should run, and how to move through installation, deployment, verification, and handoff on a confirmed route.

It is designed to work with an agent, not replace the agent as a universal deployment engine. You can provide a GitHub repository, product website, or official docs page; it starts with shallow recognition, then reports the project purpose, official entrypoint, suggested environment, deployment difficulty, and visible risks before asking whether to continue.

It is more like a project deployment advisor than an automatic construction crew: it helps the agent understand the project, choose a route, flag risks, and then move through deployment only after confirmation.

**How It Works**

- 🔎 **Shallow recognition**

  Reads the README, official docs, quick start, installation, configuration, and security entrypoints first, then returns a one-line project summary, official source, suggested route, environment needs, and visible risks.

- 🧭 **Semantic routing**

  Selects a lightweight route or service route from project evidence and the user's goal. After classification, it loads one primary route plus only the conditional rules that actually match instead of forcing every repository into the same deployment workflow.

- ✅ **Confirmed execution**

  Even when the first request asks for deployment, it completes read-only recognition and asks for confirmation first. After confirmation, it moves through installation, configuration, access, verification, and handoff in stages.

- ⚖️ **Adaptive depth**

  Keeps simple, low-risk projects on the shortest path. Multi-component systems, public access, account setup, payments, webhooks, certificates, or production targets receive deeper checks and confirmations.

- 🔐 **Sensitive configuration warnings**

  Watches for environment variables, API keys, tokens, account credentials, private keys, default credentials, debug mode, and production-switch requirements. The agent reports names, purposes, and storage locations without asking the user to paste real values into the conversation.

- 🖥️ **Environment preflight**

  Checks CPU, memory, disk, Docker, ports, proxies, certificate systems, and existing services before changing a remote host or long-running environment.

- 📝 **Handoff summary**

  After installation or deployment, it reports access entrypoints, account state, management commands, credential handling, maintenance notes, and rollback paths. Normal reports do not store plaintext passwords; temporary credentials are provided only in the current private conversation when needed.

**Best-fit repositories**

- 🐳 **Docker / Compose self-hosted services**

  Suitable for API services, web apps, database-backed stacks, and personal tools. Before startup, `lander` checks Compose, ports, mounts, permissions, persistence, and secret injection; after startup, it verifies container health and application responses.

- 🌐 **Web, backend, and full-stack applications**

  Suitable for projects whose official documentation defines the runtime entrypoint, dependencies, and configuration. `lander` selects local execution, Docker, VPS, or another supported route based on the target environment.

- 📌 **Long-running VPS services**

  Suitable for services that need public ingress, HTTPS, reverse proxies, DNS, certificate renewal, and coexistence with existing sites. It confirms the current ingress and certificate systems before making changes.

- 🧰 **Script installers / panel-managed projects**

  Suitable for projects that provide install scripts, management commands, interactive menus, or admin panels. `lander` reports access entrypoints, account state, credential source, management commands, and follow-up maintenance steps during handoff.

- 💻 **Local trial runs**

  Suitable for small services, CLIs, and developer tools that should run on the current computer or in WSL2 first. `lander` confirms the official command and required environment before installation or startup.

- 🧩 **Agent / MCP / browser extension / CLI tools**

  Suitable for tool repositories with a clear official installation entrypoint. `lander` identifies the destination, official command, and minimum verification path without treating ordinary attachments or manual uploads as server deployments.

`SKILL.md` stays a thin dispatcher. It classifies the project, selects either the lightweight or service route, and conditionally adds rules for secrets, public access, existing web stacks, script handoff, and deployment records.

## 📦 Install

Run this in your terminal:

```powershell
npx github:hajimi2024/lander
```

The official Skills CLI then reads the repository, detects `lander`, and confirms the target agent, installation scope, and installation method as needed for the current environment. While the repository remains private, the computer must have GitHub credentials with access to it.

## 🧭 Interactive Choices

The official Skills CLI decides which prompts are required for the current environment:

- **Skill**: this repository contains only `lander`, so the single discovered skill is used directly.
- **Agent**: multiple detected agents produce a selection list; one detected agent may be selected automatically. The complete list is maintained by Skills CLI.
- **Scope**: Project / Global is prompted when the scope was not fixed by a flag and the selected agent supports global installation.
- **Method**: Symlink / Copy is prompted when multiple distinct install directories are involved; a single directory may use Copy directly.

The exact interface therefore depends on the agents installed on the computer and the user's selections.

<a id="update"></a>

## ♻️ Update

When this repository has a newer version of `lander` and you installed it globally, run:

```powershell
npx skills@latest update lander -g
```

Skills CLI fetches the source repository again and updates the installed Skill files on this computer. Restart the target agent or start a new task if the update is not discovered immediately.

If you installed it into a project, run this from that project directory instead:

```powershell
npx skills@latest update lander
```

## 💬 Usage

Use natural language; there is no fixed sentence you need to memorize. Put a GitHub repository, product website, or official docs page after `/lander`:

```text
/lander https://github.com/author/repository
```

```text
/lander https://project.example.com
```

The first round is shallow recognition only: it explains what the project does, the official entrypoint, the recommended route, the suggested environment, and visible risks, then asks whether to continue into installation or deployment. Even when the first request asks for deployment, `lander` completes this confirmation round before execution.

You can also skip the explicit command and describe the goal naturally. For tasks involving GitHub project assessment, installation, deployment, verification, or import, an agent can select `lander` from its Skill description.

## 🛡️ Safety Boundaries

- Do not guess passwords, tokens, API keys, domains, paths, exposure scope, or paid-service choices.
- Do not ask users to send real secrets in the conversation; advise immediate revocation or rotation when one is exposed.
- Treat "check only" as read-only.
- Do not expose a service publicly while default credentials, debug mode, or an unprotected administration interface remain.
- Do not disable firewalls, stop all containers, delete certificates, or replace existing proxy/certificate systems without an explicit plan.
- Keep deployment records private and out of GitHub, issues, PRs, releases, and CI artifacts by default.
- Generate a separate redacted copy when information must be shared publicly.

## 🗂️ Structure

This is a single Skill repository. The root `SKILL.md` is the installable entrypoint. The terminal wrapper only adds the animation and delegates to the official Skills CLI.

```text
lander/
├── SKILL.md
├── README.md
├── README.en.md
├── agents/
├── assets/templates/
├── bin/
│   └── lander.mjs
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

No license has been selected yet. Do not treat this repository as freely redistributable until a license is added.
