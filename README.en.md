<div align="center">

# 🚀 lander

**Turn a GitHub repository into a runnable, deployable, or importable project with a stable agent workflow**

[简体中文](README.md) · [Install](#-install) · [Update](#-update) · [Usage](#-usage)

</div>

---

## ✨ What It Does

`lander` gives an agent a decision workflow for approaching an unfamiliar GitHub repository.

It first identifies the project shape, then chooses an executable path from the official docs, and only then moves through installation, configuration, access, verification, and handoff. It is useful when you hand a repository to an agent and need a clear route toward a working result.

### How It Works

#### 🔎 Repository Assessment

Reads README files, install docs, Compose files, Dockerfiles, package manifests, and environment examples.

Classifies whether the repository is an app, service, CLI, Skill, MCP, browser extension, or another type that needs special handling.

#### 🧭 Route Selection

Chooses only from officially supported paths.

It prefers the route with fewer dependencies, steadier operations, and lower risk. When direct use is enough, it does not default to development or build workflows.

#### 🖥️ Environment Preflight

Runs read-only checks before touching remote hosts or long-running environments.

Checks CPU, memory, disk, Docker, ports, proxies, and certificate systems before deciding whether to modify anything.

#### ✅ Stage-by-stage Verification

Validates real outcomes after each step.

This includes processes, containers, ports, HTTP/API responses, persistence, and the health of existing services.

#### 📝 Handoff Records

Creates concise, private-by-default, redacted deployment records at the right lifecycle points.

These records are for maintenance and are not published to GitHub or public channels automatically.

### Best-fit Repositories

#### 🐳 Docker / Compose Self-hosted Services

Works well for panels, API services, web apps, database-backed stacks, and personal tools.

`lander` checks Docker, containers, ports, mounts, resources, and health before bringing services up.

#### 🌐 Web Services, Backend Services, and Full-stack Apps

Works well for frontend/backend projects with a documented startup path.

`lander` first confirms the entrypoint, environment variables, and dependencies from project docs, then chooses local runtime, Docker, VPS, or another official path.

#### 🖥️ Long-running VPS Services

Useful for services that need public ingress, HTTPS, reverse proxies, DNS-01, renewal migration, and coexistence with existing sites.

`lander` confirms the current ingress and certificate systems first, so a new service does not disrupt what is already running.

#### 💻 Local Trial Runs

Useful when you want to get a small service, CLI, or developer tool running on your current machine or inside WSL2 first.

`lander` confirms the official command and required environment before deciding whether to install dependencies, start a service, or switch to a Linux environment.

#### 🧩 Agent / MCP / Browser Extension / CLI Tools

Works well for tool repositories with a clear install entrypoint.

`lander` confirms where to install it, which command to use, and how to verify it. For ordinary attachments or manual-upload projects, it only identifies the path and does not treat them as deployment tasks.

`SKILL.md` stays intentionally thin. It carries the main workflow and routing rules, while task-specific details live in first-level `references/` files that are loaded only when needed.

## 📦 Install

Start the interactive Skills CLI installer:

```powershell
npx skills@latest add hajimi2024/lander -g
```

After installation, restart the target agent or start a new task if it does not discover newly installed skills immediately.

## 🔄 Update

When this GitHub repository has a newer version of `lander`, run this in your terminal:

```powershell
npx skills@latest update lander -g
```

This updates the globally installed `lander`. If you originally chose Project scope, run it from that project directory and replace `-g` with `-p`.

## 🧭 Interactive Choices

The Skills CLI will guide you through these choices:

- **Skill**: choose `lander`.
- **Agent**: choose the agents you actually use, such as `codex`, `claude-code`, `cursor`, or `opencode`. The complete list is maintained by the current Skills CLI release.
- **Scope**: Global is the recommended default because `lander` is useful across repositories and projects. Choose Project only when a repository should carry its own fixed skill installation.
- **Method**: Symlink is the recommended default because it is easier to update. Choose Copy when symlinks are unavailable, you need a fixed snapshot, or you are preparing a team handoff.

## 💬 Usage

Invoke it explicitly:

```text
/lander analyze and deploy https://github.com/owner/repository
```

Only identify and plan, without changing the environment:

```text
/lander inspect https://github.com/owner/repository. First round only: analyze, do not modify the environment.
```

Deploy to a VPS with a read-only preflight first:

```text
/lander deploy https://github.com/owner/repository to my VPS, and run a read-only preflight check first.
```

Natural language also works. If the task involves recognizing, installing, deploying, validating, or importing a GitHub project, the agent can choose `lander` automatically.

## 🛡️ Safety Boundaries

- Do not guess passwords, tokens, API keys, domains, target paths, or paid-service choices.
- Treat "check only" as read-only and do not modify the target environment.
- Do not disable firewalls, stop all containers, delete certificates, or replace existing proxy/certificate systems without an explicit plan and confirmation.
- Keep deployment records private by default and out of GitHub, issues, PRs, releases, and CI artifacts.
- When a deployment record must be shared publicly, keep the private original and generate a separately redacted public copy.

## 🗂️ Structure

This is a single Skill repository. The root `SKILL.md` is the installable skill entrypoint.

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

No license has been selected yet. Do not treat this repository as freely redistributable until a license is added.
