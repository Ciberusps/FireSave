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
  `cd steamworks_sdk && npx node-7z-archive a ../steamworks_sdk.zip * -aoa -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -y`
);
