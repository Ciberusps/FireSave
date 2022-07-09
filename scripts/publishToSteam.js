require("dotenv").config();
const exec = require("child_process").execSync;
const path = require("path");

const { checkRequiredEnvs } = require("./utils");

const { STEAM_CMD, STEAM_USERNAME, STEAM_PASSWORD, WORKFOLDER } = process.env;
checkRequiredEnvs([
  "STEAM_CMD",
  "STEAM_USERNAME",
  "STEAM_PASSWORD",
  "WORKFOLDER",
]);

const buildScriptPath = path.normalize(path.resolve("./steam_build.vdf"));

exec(
  `${STEAM_CMD} +login ${STEAM_USERNAME} ${STEAM_PASSWORD} +run_app_build ${buildScriptPath} +quit`
);
console.info("- [publishToSteam] success");
