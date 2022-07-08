require("dotenv").config();
const exec = require("child_process").execSync;

const { STEAMWORKS_SDK_GOOGLE_DRIVE_LINK, STEAMWORKS_SDK_ARCHIVE_PASSWORD } =
  process.env;

if (!STEAMWORKS_SDK_GOOGLE_DRIVE_LINK) {
  throw new Error(
    "process.env.STEAMWORKS_SDK_GOOGLE_DRIVE_LINK should be defined"
  );
}
if (!STEAMWORKS_SDK_ARCHIVE_PASSWORD) {
  throw new Error(
    "process.env.STEAMWORKS_SDK_ARCHIVE_PASSWORD should be defined"
  );
}

try {
  exec(`curl -L "${STEAMWORKS_SDK_GOOGLE_DRIVE_LINK}" > steamworks_sdk.zip`);
  console.info("- [fetchSteamworksSdk] successfully downloaded");

  exec(
    `npx 7z-wasm x steamworks_sdk.zip -o./release/app/node_modules/greenworks/deps/steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`
  );
  console.info("- [fetchSteamworksSdk] successfully unzipped for greenworks");

  exec(
    `npx 7z-wasm x steamworks_sdk.zip -o./steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`
  );
  console.info("- [fetchSteamworksSdk] successfully unzipped for steam build");
} catch (err) {
  console.error(err);
}
