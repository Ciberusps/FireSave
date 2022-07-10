require("dotenv").config();
const exec = require("child_process").execSync;
const path = require("path");

const { checkRequiredEnvs } = require("./utils");

const { STEAM_CMD, STEAM_USERNAME, STEAM_PASSWORD, WORKFOLDER } = process.env;
checkRequiredEnvs([
  "STEAM_CMD",
  "STEAM_USERNAME",
  "STEAM_PASSWORD",
  // "WORKFOLDER",
]);

const buildScriptPath = path.normalize(path.resolve("./steam_build.vdf"));

// exec(`sudo ls -l ${STEAM_CMD}`, { stdio: "inherit" });
// exec(`sudo chmod -R -f 1212 ./steamworks_sdk`, { stdio: "inherit" });
// TODO: RUNNER_OS add sudo on macos/linux
exec(
  `${STEAM_CMD} +login "${STEAM_USERNAME}" "${STEAM_PASSWORD}" +run_app_build ${buildScriptPath} +quit`,
  { stdio: "inherit" }
);
console.info("- [publishToSteam] success");
