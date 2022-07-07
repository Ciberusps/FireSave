require("dotenv").config();
const exec = require("child_process").execSync;

const { checkRequiredEnvs } = require("./utils");

const { STEAMWORKS_SDK_GOOGLE_DRIVE_LINK, STEAMWORKS_SDK_ARCHIVE_PASSWORD } =
  process.env;
checkRequiredEnvs([
  "STEAMWORKS_SDK_GOOGLE_DRIVE_LINK",
  "STEAMWORKS_SDK_ARCHIVE_PASSWORD",
]);

try {
  exec(`curl -L "${STEAMWORKS_SDK_GOOGLE_DRIVE_LINK}" > steamworks_sdk.zip`);
  console.info("- [fetchSteamworksSdk] downloaded");

  exec(
    `npx 7z-wasm x steamworks_sdk.zip -o./release/app/node_modules/greenworks/deps/steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`
  );
  console.info("- [fetchSteamworksSdk] unzipped for greenworks");

  exec(
    `npx 7z-wasm x steamworks_sdk.zip -o./steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`
  );
  console.info("- [fetchSteamworksSdk] unzipped for steam build");
} catch (err) {
  console.error(err);
}
