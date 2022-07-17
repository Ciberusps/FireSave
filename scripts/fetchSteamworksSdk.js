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
  exec(
    `npx 7z-wasm x steamworks_sdk_test.zip -o./release/app/node_modules/greenworks/deps/steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`
  );
  console.info("- [fetchSteamworksSdk] unzipped for greenworks");
} catch (err) {
  console.error(err);
}
