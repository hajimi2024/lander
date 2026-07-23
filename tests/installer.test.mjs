import test from "node:test";
import assert from "node:assert/strict";
import {
  BANNER,
  DIVIDER,
  TAGLINE,
  buildSkillsCommand,
  buildSpawnOptions,
  supportsAnimation
} from "../bin/lander-new.mjs";

test("banner contains the requested identity and subtitle", () => {
  assert.equal(BANNER.length, 6);
  assert.equal(DIVIDER, "──●────●────●────●────●────●──");
  assert.equal(TAGLINE, "lander-new • AI Skills for Codex • Cursor • Grok Build");
});

test("installer delegates to the official Skills CLI without forcing global scope", () => {
  assert.deepEqual(buildSkillsCommand([], "win32"), {
    executable: "npx.cmd",
    args: ["skills@latest", "add", "hajimi2024/lander-new"]
  });
  assert.deepEqual(buildSkillsCommand(["--copy"], "linux"), {
    executable: "npx",
    args: ["skills@latest", "add", "hajimi2024/lander-new", "--copy"]
  });
});

test("installer uses shell execution for Windows command shims", () => {
  assert.equal(buildSpawnOptions("win32", {}).shell, true);
  assert.equal(buildSpawnOptions("linux", {}).shell, false);
});

test("animation is disabled for non-interactive and no-color output", () => {
  assert.equal(supportsAnimation({}, { isTTY: false }), false);
  assert.equal(supportsAnimation({ NO_COLOR: "1" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({ TERM: "dumb" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({ LANDER_ANIMATION: "0" }, { isTTY: true }), false);
  assert.equal(supportsAnimation({}, { isTTY: true }), true);
});
