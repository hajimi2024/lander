import { access, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { BANNER, DIVIDER, TAGLINE } from "../bin/lander.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const requiredFiles = [
  "SKILL.md",
  "README.md",
  "README.en.md",
  "agents/openai.yaml",
  "references/project-routing.md",
  "references/lightweight-routes.md",
  "references/service-routes.md",
  "references/script-installer-handoff.md",
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

const referenceFiles = await readdir(join(root, "references"));
for (const legacy of ["project-recognition.md", "deployment-strategies.md"]) {
  if (referenceFiles.includes(legacy)) {
    throw new Error(`Legacy broad reference must be removed: ${legacy}`);
  }
}

const read = async (path) => (await readFile(join(root, path), "utf8")).replace(/\r\n/g, "\n");
const skill = await read("SKILL.md");
const readmeZh = await read("README.md");
const readmeEn = await read("README.en.md");
const agentMetadata = await read("agents/openai.yaml");
const routing = await read("references/project-routing.md");
const lightweight = await read("references/lightweight-routes.md");
const service = await read("references/service-routes.md");
const scriptHandoff = await read("references/script-installer-handoff.md");
const secrets = await read("references/secret-safety.md");
const accessRules = await read("references/security-and-access.md");
const webStack = await read("references/managed-web-stack-conflicts.md");
const artifacts = await read("references/artifact-contracts.md");
const summary = await read("assets/templates/project-summary.md");
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
  [!skill.includes("当 Agent 收到 GitHub 仓库"), "SKILL trigger must require deployment or usage intent"],
  [skill.includes("一个主要路线") && skill.includes("不通读全部 references"), "SKILL.md must enforce selective routing"],
  [skill.includes("references/lightweight-routes.md") && skill.includes("references/service-routes.md"), "SKILL.md must expose both primary routes"],
  [skill.includes("即使用户首轮要求安装、部署或上线") && skill.includes("第一轮识别并等待确认"), "SKILL.md must require first-round recognition before deployment"],
  [skill.includes("references/script-installer-handoff.md"), "SKILL.md must route script and panel handoff"],
  [skill.includes("## 安全门"), "SKILL.md must keep global safety gates"],
  [skill.includes("关键结果未验证时只能报告"), "SKILL.md must prevent premature success"],
  [!skill.includes("空 bind mount"), "Docker implementation details must stay out of SKILL.md"],
  [routing.includes("## 分类顺序") && routing.includes("## 深度判断") && routing.includes("完成标准"), "project routing must classify, size, and define completion"],
  [routing.includes("只读取能够改变路线判断的文件"), "project routing must limit evidence loading"],
  [routing.includes("项目一句话介绍") && routing.includes("是否继续进入安装或部署阶段"), "project routing must summarize and ask whether to continue"],
  [routing.includes("0～3 个问题"), "project routing must not force unnecessary questions"],
  [routing.includes("首轮唯一允许的受限写入"), "project routing must define the temporary clone exception"],
  [skill.includes("不需要持续管理后台进程") && skill.includes("需要持续运行进程"), "primary routes must be separated by lifecycle"],
  [lightweight.includes("需要长期托管时改走服务路线"), "lightweight route must defer managed services"],
  [lightweight.includes("CLI") && lightweight.includes("MCP"), "lightweight route must cover direct and importable artifacts"],
  [service.includes("## Docker / Compose"), "service route must own container guidance"],
  [service.includes("空 bind mount"), "service route must protect image-seeded data"],
  [service.includes("区分应用故障和验证探针错误"), "service route must distinguish probe defects"],
  [scriptHandoff.includes("匹配真实部署方式"), "management commands must match the deployment mode"],
  [scriptHandoff.includes("不承诺找回明文"), "hashed credentials must use reset instead of recovery"],
  [scriptHandoff.includes("中文说明"), "management commands must include concise Chinese guidance"],
  [scriptHandoff.includes("独立的两行") && scriptHandoff.includes("`docker restart <container>`") && scriptHandoff.includes("不静默省略"), "script handoff must use a complete, command-first format"],
  [secrets.includes("固定默认凭据") && secrets.includes("安装器随机生成凭据"), "secret rules must distinguish credential origins"],
  [secrets.includes("## 生产门"), "secret rules must cover production transition"],
  [accessRules.includes("不能代替身份验证"), "hidden paths and ports must not replace authentication"],
  [accessRules.includes("内网/元数据访问边界"), "high-cost network tools must define an outbound boundary"],
  [webStack.includes("唯一权威入口"), "existing web stacks must retain one authoritative ingress"],
  [webStack.includes("scripts/preflight.sh web-stack"), "web-stack preflight must use the repository script path"],
  [webStack.includes("完成标准"), "web-stack coexistence must define completion"],
  [artifacts.includes("## 对话交接"), "artifact rules must require conversational handoff"],
  [artifacts.includes("同时满足以下条件"), "artifact rules must own the record trigger"],
  [artifacts.includes("轻量安装、CLI、导入"), "lightweight tasks must avoid deployment records"],
  [report.includes("## 访问与管理"), "deployment report must support panel handoff"],
  [report.includes("不在本报告记录明文密码"), "deployment report must reject plaintext passwords"],
  [report.includes("凭据来源") && report.includes("管理命令与中文说明"), "deployment report must record credential origin and operations"],
  [summary.includes("执行深度"), "project summary must record execution depth"],
  [readmeZh.includes("只读取一个主要路线"), "Chinese README must describe selective routing"],
  [readmeEn.includes("loads one primary route"), "English README must describe selective routing"],
  [readmeZh.includes("使用自然语言即可") && readmeEn.includes("Use natural language"), "README usage must emphasize semantic invocation"],
  [readmeZh.includes("https://project.example.com") && readmeEn.includes("https://project.example.com"), "README must include website/docs entry examples"],
  [readmeZh.includes("第一轮只做浅层识别") && readmeZh.includes("询问是否继续安装或部署"), "Chinese README must describe shallow first-round confirmation"],
  [readmeEn.includes("first round is shallow recognition only") && readmeEn.includes("asks whether to continue into installation or deployment"), "English README must describe shallow first-round confirmation"],
  [readmeZh.includes("npx github:hajimi2024/lander"), "Chinese README must show the animated installer"],
  [readmeEn.includes("npx github:hajimi2024/lander"), "English README must show the animated installer"],
  [readmeZh.includes(readmeBanner), "Chinese README banner must match the installer"],
  [readmeEn.includes(readmeBanner), "English README banner must match the installer"],
  [!readmeZh.includes("安装器会先播放"), "Chinese install section must not repeat the terminal banner"],
  [!readmeEn.includes("installer first plays"), "English install section must not repeat the terminal banner"],
  [readmeZh.includes("## ♻️ 更新"), "Chinese README must use the recycling icon for updates"],
  [readmeEn.includes("## ♻️ Update"), "English README must use the recycling icon for updates"],
  [readmeZh.includes("npx skills@latest update lander -g"), "Chinese README must show the global update command"],
  [readmeEn.includes("npx skills@latest update lander -g"), "English README must show the global update command"],
  [readmeZh.includes("[更新](#update)") && readmeZh.includes('<a id="update"></a>'), "Chinese README update navigation must use a stable explicit anchor"],
  [readmeEn.includes("[Update](#update)") && readmeEn.includes('<a id="update"></a>'), "English README update navigation must use a stable explicit anchor"],
  [readmeBadges.every((badge) => readmeZh.includes(badge)), "Chinese README must include the capability badges"],
  [readmeBadges.every((badge) => readmeEn.includes(badge)), "English README must include the capability badges"],
  [readmeZh.includes("README.en.md"), "Chinese README must link to English"],
  [readmeEn.includes("README.md"), "English README must link to Chinese"],
  [agentMetadata.includes('display_name: "lander"'), "Agent metadata must keep the lander identity"],
  [agentMetadata.includes("/lander"), "Agent metadata must keep the public invocation"]
];

for (const [condition, message] of assertions) {
  if (!condition) throw new Error(message);
}

for (const reference of referenceFiles.filter((path) => path.endsWith(".md"))) {
  if (!skill.includes(`references/${reference}`)) {
    throw new Error(`SKILL.md must directly expose reference: ${reference}`);
  }
}

const publicText = [
  skill,
  readmeZh,
  readmeEn,
  agentMetadata,
  routing,
  lightweight,
  service,
  scriptHandoff,
  secrets,
  accessRules,
  webStack,
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

console.log("lander static validation passed");
