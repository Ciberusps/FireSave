require("dotenv").config();
const exec = require("child_process").execSync;

const { STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK, STEAMWORKS_SDK_ARCHIVE_PASSWORD } =
  process.env;

if (!STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK) {
  throw new Error(
    "process.env.STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK should be defined"
  );
}
if (!STEAMWORKS_SDK_ARCHIVE_PASSWORD) {
  throw new Error(
    "process.env.STEAMWORKS_SDK_ARCHIVE_PASSWORD should be defined"
  );
}

try {
  exec(
    `curl -L "${STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK}" > steam_auth_files.zip`
  );
  console.info("- [fetchSteamAuthFiles]");

  exec(
    `npx 7z-wasm x steam_auth_files.zip -o./steamworks_sdk/tools/ContentBuilder/builder -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`
  );
  console.info("- [fetchSteamAuthFiles] successfully unzipped");
} catch (err) {
  console.error(err);
}
