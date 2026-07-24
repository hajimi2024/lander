import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { BANNER, DIVIDER, TAGLINE } from "../bin/lander-new.mjs";

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
  "bin/lander-new.mjs"
];

for (const path of requiredFiles) {
  await access(join(root, path));
}

const read = async (path) => readFile(join(root, path), "utf8");
const skill = await read("SKILL.md");
const readmeZh = await read("README.md");
const readmeEn = await read("README.en.md");
const recognition = await read("references/project-recognition.md");
const strategies = await read("references/deployment-strategies.md");
const security = await read("references/secret-safety.md");
const accessRules = await read("references/security-and-access.md");
const artifacts = await read("references/artifact-contracts.md");
const summary = await read("assets/templates/project-summary.md");
const report = await read("assets/templates/deployment-report.md");
const readmeBanner = `${BANNER.map((line) => line.trimEnd()).join("\n")}

${DIVIDER}
   ${TAGLINE}`;
const readmeBadges = [
  "lander--new-Agent_Skill-d1008f",
  "GitHub-Repository_Analysis-168aad",
  "Targets-Local_%E2%80%A2_WSL2_%E2%80%A2_VPS-16a34a",
  "Routes-Docker_%E2%80%A2_Compose_%E2%80%A2_Native-0891b2",
  "Workflow-Guided_Deployment-d97706",
  "Security-Preflight_First-b91c1c",
  "Repository-Single_Skill-4f46e5"
];

const assertions = [
  [skill.startsWith("---\nname: lander-new\n"), "SKILL.md frontmatter must identify lander-new"],
  [skill.includes("## 自适应深度"), "SKILL.md must define adaptive execution depth"],
  [skill.includes("默认从轻量流程开始"), "SKILL.md must start with the lightweight workflow"],
  [skill.includes("安全风险不因流程轻量而省略"), "SKILL.md must keep safety independent from complexity"],
  [skill.includes("references/secret-safety.md"), "SKILL.md must route sensitive configuration"],
  [skill.includes("不得开放公网"), "SKILL.md must include a public exposure gate"],
  [recognition.includes("## 任务路径"), "project recognition must classify the user's task path"],
  [recognition.includes("## 复杂度与风险"), "project recognition must assess complexity and risk separately"],
  [recognition.includes("## 可维护性与生产支持"), "project recognition must separate runnable code from production support"],
  [strategies.includes("轻量流程") && strategies.includes("标准流程") && strategies.includes("增强流程"), "execution strategies must define all adaptive depths"],
  [strategies.includes("只验证当前路线应有的结果"), "execution strategies must use route-specific verification"],
  [strategies.includes("不要从 Git tag 或 Release 名机械推导容器 tag"), "container image tags must be verified instead of inferred"],
  [strategies.includes("空 bind mount 可能遮蔽"), "Docker mounts must account for image-seeded data"],
  [strategies.includes("先修正验证探针"), "verification failures must distinguish probe defects from application defects"],
  [security.includes("默认凭据"), "secret-safety must cover default credentials"],
  [security.includes("固定默认凭据") && security.includes("首次初始化流程"), "secret-safety must distinguish default credentials from first-run setup"],
  [security.includes("开发到生产"), "secret-safety must cover production transition"],
  [security.includes("安全风险与项目复杂度分开判断"), "secret-safety must override lightweight execution when needed"],
  [accessRules.includes("不能代替身份验证"), "hidden paths and ports must not replace authentication"],
  [accessRules.includes("内网/元数据访问边界"), "high-cost network tools must define an outbound access boundary"],
  [artifacts.includes("## 对话交接简报"), "artifact contracts must require a conversational handoff"],
  [artifacts.includes("轻量安装、导入、CLI"), "artifact contracts must avoid deployment records for lightweight tasks"],
  [artifacts.includes("即使创建或修改了临时文件"), "temporary file changes must not force deployment records"],
  [skill.includes("轻量任务默认不创建日志"), "lightweight tasks must not create deployment logs by default"],
  [summary.includes("执行深度"), "project summary must record execution depth"],
  [summary.includes("组件关系（如适用）"), "project summary must keep topology conditional"],
  [report.includes("验证结果"), "deployment report must record verification outcomes"],
  [report.includes("上游维护与生产支持状态"), "deployment report must record upstream support status"],
  [report.includes("未验证或阻塞范围"), "deployment report must separate verified and blocked scope"],
  [report.includes("撤销或恢复方式"), "deployment report must record rollback or removal guidance"],
  [report.includes("默认凭据处理状态"), "deployment report must record credential status"],
  [readmeZh.includes("⚖️ **自适应深度**"), "Chinese README must describe adaptive depth"],
  [readmeEn.includes("⚖️ **Adaptive depth**"), "English README must describe adaptive depth"],
  [readmeZh.includes("npx github:hajimi2024/lander-new"), "Chinese README must show the animated installer"],
  [readmeEn.includes("npx github:hajimi2024/lander-new"), "English README must show the animated installer"],
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

const publicText = [
  skill,
  readmeZh,
  readmeEn,
  recognition,
  strategies,
  security,
  accessRules,
  artifacts,
  summary,
  report
].join("\n");
const forbidden = [
  ["落地", "者"].join(""),
  ["$", "lander"].join(""),
  ["Keji", "Lion"].join(""),
  ["keji", "lion"].join(""),
  ["/root/", "keji", "lion.sh"].join(""),
  ["/usr/local/bin/", "k"].join(""),
  ["github.com/", "keji", "lion"].join(""),
  ["Dujiao", "-Next"].join(""),
  ["dujiao", "-next"].join(""),
  ["149", ".104.78.227"].join(""),
  ["sslip", ".io"].join("")
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

console.log("lander-new static validation passed");
