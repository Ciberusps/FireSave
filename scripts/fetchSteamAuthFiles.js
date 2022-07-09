require("dotenv").config();
const exec = require("child_process").execSync;
const path = require("path");

const { checkRequiredEnvs } = require("./utils");

const {
  STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK,
  STEAMWORKS_SDK_ARCHIVE_PASSWORD,
  STEAMCMD_DIR,
} = process.env;
checkRequiredEnvs([
  "STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK",
  "STEAMWORKS_SDK_ARCHIVE_PASSWORD",
  "STEAMCMD_DIR",
]);

const steamCmdDirWithoutSlashAtTheEnd = STEAMCMD_DIR.slice(
  0,
  STEAMCMD_DIR.length - 1
);

try {
  exec(
    `curl -L "${STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK}" > steam_auth_files.zip`
  );
  console.info("- [fetchSteamAuthFiles] donwloaded");

  exec(
    `npx 7z-wasm x steam_auth_files.zip -o./steam_auth_files -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`
  );
  console.info("- [fetchSteamAuthFiles] unzipped");

  exec(`cp -r ./steam_auth_files/. "${steamCmdDirWithoutSlashAtTheEnd}"`);
  console.info("- [fetchSteamAuthFiles] copied");
} catch (err) {
  console.error(err);
}
