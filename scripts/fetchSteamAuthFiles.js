require("dotenv").config();
const exec = require("child_process").execSync;

const { checkRequiredEnvs } = require("./utils");

const { STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK, STEAMWORKS_SDK_ARCHIVE_PASSWORD } =
  process.env;
checkRequiredEnvs([
  "STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK",
  "STEAMWORKS_SDK_ARCHIVE_PASSWORD",
]);

try {
  exec(
    `curl -L "${STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK}" > steam_auth_files.zip`
  );
  console.info("- [fetchSteamAuthFiles] donwloaded");

  exec(
    `npx 7z-wasm x steam_auth_files.zip -o./steamworks_sdk/tools/ContentBuilder/builder -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`
  );
  console.info("- [fetchSteamAuthFiles] unzipped");
} catch (err) {
  console.error(err);
}
