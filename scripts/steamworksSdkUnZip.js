require("dotenv").config();
const { exec } = require("child_process");

const { STEAMWORKS_SDK_ARCHIVE_PASSWORD } = process.env;
if (!STEAMWORKS_SDK_ARCHIVE_PASSWORD) {
  throw new Error(
    "process.env.STEAMWORKS_SDK_ARCHIVE_PASSWORD should be defined"
  );
}

console.info(
  `Your steamworks sdk archive password ${STEAMWORKS_SDK_ARCHIVE_PASSWORD}`
);

exec(
  `npx 7z-wasm x steamworks_sdk.zip -o./release/app/node_modules/greenworks/deps/steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -aoa`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

    console.log("successfully unzipped ");
  }
);
