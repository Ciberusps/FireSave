require("dotenv").config();
const { exec } = require("child_process");

const { STEAMWORKS_SDK_GOOGLE_DRIVE_LINK } = process.env;

if (!STEAMWORKS_SDK_GOOGLE_DRIVE_LINK) {
  throw new Error(
    "process.env.STEAMWORKS_SDK_GOOGLE_DRIVE_LINK should be defined"
  );
}

exec(
  `curl -L "${STEAMWORKS_SDK_GOOGLE_DRIVE_LINK}" > steamworks_sdk.zip`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

    console.log("successfully downloaded");
  }
);
