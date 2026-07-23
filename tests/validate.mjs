import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { BANNER, DIVIDER, TAGLINE } from "../bin/lander.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const requiredFiles = [
  "SKILL.md",
  "README.md",
  "README.en.md",
  "agents/openai.yaml",
  "references/project-recognition.md",
  "references/deployment-strategies.md",
  "references/secret-safety.md",
  "references/security-and-access.md",
  "references/managed-web-stack-conflicts.md",
  "references/artifact-contracts.md",
  "scripts/preflight.sh",
  "assets/templates/project-summary.md",
  "assets/templates/deployment-log.md",
  "assets/templates/deployment-report.md",
  "bin/lander.mjs"
];

for (const path of requiredFiles) {
  await access(join(root, path));
}

const read = async (path) => readFile(join(root, path), "utf8");
const skill = await read("SKILL.md");
const readmeZh = await read("README.md");
const readmeEn = await read("README.en.md");
const security = await read("references/secret-safety.md");
const report = await read("assets/templates/deployment-report.md");
const readmeBanner = `${BANNER.map((line) => line.trimEnd()).join("\n")}

${DIVIDER}
   ${TAGLINE}`;
const readmeBadges = [
  "lander-Agent_Skill-d1008f",
  "GitHub-Repository_Analysis-168aad",
  "Targets-Local_%E2%80%A2_WSL2_%E2%80%A2_VPS-16a34a",
  "Routes-Docker_%E2%80%A2_Compose_%E2%80%A2_Native-0891b2",
  "Workflow-Guided_Deployment-d97706",
  "Security-Preflight_First-b91c1c",
  "Repository-Single_Skill-4f46e5"
];

const assertions = [
  [skill.startsWith("---\nname: lander\n"), "SKILL.md frontmatter must identify lander"],
  [skill.includes("references/secret-safety.md"), "SKILL.md must route sensitive configuration"],
  [skill.includes("不得开放公网"), "SKILL.md must include a public exposure gate"],
  [security.includes("默认凭据"), "secret-safety must cover default credentials"],
  [security.includes("开发到生产"), "secret-safety must cover production transition"],
  [report.includes("默认凭据处理状态"), "deployment report must record credential status"],
  [readmeZh.includes("npx github:hajimi2024/lander"), "Chinese README must show the animated installer"],
  [readmeEn.includes("npx github:hajimi2024/lander"), "English README must show the animated installer"],
  [readmeZh.includes(readmeBanner), "Chinese README banner must match the installer"],
  [readmeEn.includes(readmeBanner), "English README banner must match the installer"],
  [!readmeZh.includes("安装器会先播放"), "Chinese install section must not repeat the terminal banner"],
  [!readmeEn.includes("installer first plays"), "English install section must not repeat the terminal banner"],
  [readmeZh.includes("## ♻️ 更新"), "Chinese README must use the recycling icon for updates"],
  [readmeEn.includes("## ♻️ Update"), "English README must use the recycling icon for updates"],
  [readmeBadges.every((badge) => readmeZh.includes(badge)), "Chinese README must include the capability badges"],
  [readmeBadges.every((badge) => readmeEn.includes(badge)), "English README must include the capability badges"],
  [readmeZh.includes("README.en.md"), "Chinese README must link to English"],
  [readmeEn.includes("README.md"), "English README must link to Chinese"]
];

for (const [condition, message] of assertions) {
  if (!condition) throw new Error(message);
}

const publicText = [skill, readmeZh, readmeEn, security].join("\n");
const forbidden = [
  ["落地", "者"].join(""),
  ["$", "lander"].join(""),
  ["Keji", "Lion"].join(""),
  ["keji", "lion"].join(""),
  ["/root/", "keji", "lion.sh"].join(""),
  ["/usr/local/bin/", "k"].join(""),
  ["github.com/", "keji", "lion"].join("")
];

for (const term of forbidden) {
  if (publicText.includes(term)) {
    throw new Error(`Forbidden legacy term found: ${term}`);
  }
}

const suspiciousSecrets = [
  /\bghp_[A-Za-z0-9]{30,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{40,}\b/,
  /\bsk-[A-Za-z0-9]{32,}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/
];

for (const pattern of suspiciousSecrets) {
  if (pattern.test(publicText)) {
    throw new Error(`Potential real secret found: ${pattern}`);
  }
}

console.log("lander static validation passed");
