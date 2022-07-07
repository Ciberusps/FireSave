require("dotenv").config();
const exec = require("child_process").execSync;

const { STEAMWORKS_SDK_ARCHIVE_PASSWORD } = process.env;
if (!STEAMWORKS_SDK_ARCHIVE_PASSWORD) {
  throw new Error(
    "process.env.STEAMWORKS_SDK_ARCHIVE_PASSWORD should be defined"
  );
}

exec(
  `npx 7z-wasm x steamworks_sdk.zip -o./release/app/node_modules/greenworks/deps/steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

    console.log("- [steamworksSdkUnZip] successfully unzipped for greenworks");
  }
);

exec(
  `npx 7z-wasm x steamworks_sdk.zip -o./steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

    console.log("- [steamworksSdkUnZip] successfully unzipped for greenworks");
  }
);
