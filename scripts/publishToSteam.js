require("dotenv").config();
const exec = require("child_process").execSync;
const path = require("path");

const { checkRequiredEnvs } = require("./utils");

const { STEAM_CMD, STEAM_USERNAME, STEAM_PASSWORD, STEAM_GUARD_CODE } =
  process.env;
checkRequiredEnvs([
  "STEAM_CMD",
  "STEAM_USERNAME",
  "STEAM_PASSWORD",
  "STEAM_GUARD_CODE",
]);

const buildScriptPath = path.normalize(path.resolve("./steam_build.vdf"));

exec(
  `${STEAM_CMD} +login "${STEAM_USERNAME}" "${STEAM_PASSWORD}" "${STEAM_GUARD_CODE}" +run_app_build ${buildScriptPath} +quit`,
  { stdio: "inherit" }
);
console.info("- [publishToSteam] success");
