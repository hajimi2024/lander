<div align="center">

# 🚀 lander-new

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

## ✨ What It Does

`lander-new` gives an agent a structured workflow for assessing and executing an unfamiliar GitHub repository.

It identifies the project shape and official usage path first, selects a route for the target environment, and then handles configuration, execution, access, verification, and handoff. The first round is analysis-only: it does not install dependencies, connect to a server, or change the environment.

`lander-new` starts with a lightweight workflow. Analysis expands only as task complexity grows, while sensitive information independently triggers the relevant safety checks.

After classification, it loads one primary route plus only the conditional rules that actually match. Simple projects do not carry server deployment, certificate, or long-term operations guidance.

**How It Works**

- 🔎 **Repository assessment**

  Reads README files, official docs, installation instructions, Compose files, Dockerfiles, package manifests, and environment examples to determine the project type, official entrypoint, dependencies, and resource profile.

- 🧭 **Route selection**

  Chooses only from officially supported paths. It prefers a stable route with fewer dependencies and lower operational risk; when direct use satisfies the goal, it does not default to development or build workflows.

- ⚖️ **Adaptive depth**

  Uses a lightweight, standard, or enhanced workflow based on task complexity and operational risk. Repository size does not determine workflow depth, and a simple project still receives relevant safety checks when secrets, paid permissions, or public exposure are involved.

- 🔐 **Sensitive configuration warnings**

  Identifies environment variables, API keys, tokens, account credentials, private keys, default credentials, and production settings required by official sources. The agent reports names, purposes, and storage locations without asking the user to paste real values into the conversation.

- 🖥️ **Environment preflight**

  Checks CPU, memory, disk, Docker, ports, proxies, and certificate systems before changing a remote host or long-running environment.

- ✅ **Stage-by-stage verification**

  Verifies outcomes for the selected route: commands and minimum behavior for CLIs, target recognition for imported projects, and processes, containers, ports, application responses, and relevant persistence for running services.

- 📝 **Handoff summary**

  Every task ends with concise results and usage guidance. Environment changes add removal instructions, while actual deployments and long-running services also receive private-by-default, redacted maintenance records.

**Best-fit repositories**

- 🐳 **Docker / Compose self-hosted services**

  Suitable for API services, web apps, database-backed stacks, and personal tools. Before startup, `lander-new` checks Compose, ports, mounts, permissions, persistence, and secret injection; after startup, it verifies container health and application responses.

- 🌐 **Web, backend, and full-stack applications**

  Suitable for projects whose official documentation defines the runtime entrypoint, dependencies, and configuration. `lander-new` selects local execution, Docker, VPS, or another supported route based on the target environment.

- 📌 **Long-running VPS services**

  Suitable for services that need public ingress, HTTPS, reverse proxies, DNS-01, renewal migration, and coexistence with existing sites. It confirms the current ingress and certificate systems before making changes.

- 💻 **Local trial runs**

  Suitable for small services, CLIs, and developer tools that should run on the current computer or in WSL2 first. `lander-new` confirms the official command and required environment before installation or startup.

- 🧩 **Agent / MCP / browser extension / CLI tools**

  Suitable for tool repositories with a clear official installation entrypoint. `lander-new` identifies the destination, official command, and minimum verification path without treating ordinary attachments or manual uploads as server deployments.

`SKILL.md` stays a thin dispatcher. It classifies the project, selects either the lightweight or service route, and conditionally adds rules for secrets, public access, existing web stacks, script handoff, and deployment records.

## 📦 Install

Run this in your terminal:

```powershell
npx github:hajimi2024/lander-new
```

The official Skills CLI then reads the repository, detects `lander-new`, and confirms the target agent, installation scope, and installation method as needed for the current environment. While the repository remains private, the computer must have GitHub credentials with access to it.

## 🧭 Interactive Choices

The official Skills CLI decides which prompts are required for the current environment:

- **Skill**: this repository contains only `lander-new`, so the single discovered skill is used directly.
- **Agent**: multiple detected agents produce a selection list; one detected agent may be selected automatically. The complete list is maintained by Skills CLI.
- **Scope**: Project / Global is prompted when the scope was not fixed by a flag and the selected agent supports global installation.
- **Method**: Symlink / Copy is prompted when multiple distinct install directories are involved; a single directory may use Copy directly.

The exact interface therefore depends on the agents installed on the computer and the user's selections.

<a id="update"></a>

## ♻️ Update

When this repository has a newer version of `lander-new` and you installed it globally, run:

```powershell
npx skills@latest update lander-new -g
```

Skills CLI fetches the source repository again and updates the installed Skill files on this computer. Restart the target agent or start a new task if the update is not discovered immediately.

If you installed it into a project, run this from that project directory instead:

```powershell
npx skills@latest update lander-new
```

## 💬 Usage

Invoke it explicitly:

```text
/lander-new analyze and deploy https://github.com/owner/repository
```

Identify and plan only:

```text
/lander-new inspect https://github.com/owner/repository. First round only: analyze and do not modify the environment.
```

Deploy to a VPS with a read-only preflight:

```text
/lander-new deploy https://github.com/owner/repository to my VPS and run a read-only preflight first.
```

Natural language also works. For tasks involving GitHub project assessment, installation, deployment, verification, or import, an agent can select `lander-new` from its Skill description.

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

No license has been selected yet. Do not treat this repository as freely redistributable until a license is added.
