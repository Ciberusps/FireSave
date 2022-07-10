require("dotenv").config();
const exec = require("child_process").execSync;
const path = require("path");

const { checkRequiredEnvs } = require("./utils");

const {
  STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK,
  STEAMWORKS_SDK_ARCHIVE_PASSWORD,
  STEAMCMD_DIR,
  RUNNER_OS,
} = process.env;
checkRequiredEnvs([
  "STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK",
  "STEAMWORKS_SDK_ARCHIVE_PASSWORD",
  "STEAMCMD_DIR",
  "RUNNER_OS",
]);

try {
  exec(
    `curl -L "${STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK}" > steam_auth_files.zip`,
    { stdio: "inherit" }
  );
  console.info("- [fetchSteamAuthFiles] donwloaded");

  exec(
    `npx 7z-wasm x steam_auth_files.zip -o./steam_auth_files -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`,
    { stdio: "inherit" }
  );
  console.info("- [fetchSteamAuthFiles] unzipped");

  // mkdir -p "/home/runner/Steam/config"

  exec(`cp -r ./steam_auth_files/. "${STEAMCMD_DIR}"`);

  if (RUNNER_OS === "Linux" || RUNNER_OS === "MacOS") {
    exec(`mkdir -p "/home/runner/Steam/config"`, { stdio: "inherit" });
    exec(`cp -r ./steam_auth_files/. /home/runner/Steam`);
  }
  console.info("- [fetchSteamAuthFiles] copied");
} catch (err) {
  console.error(err);
}
