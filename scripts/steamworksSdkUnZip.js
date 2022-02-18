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
  `rm -rf ./release/app/node_modules/greenworks/deps/steamworks_sdk && npx 7zip x steamworks_sdk.zip -o./release/app/node_modules/greenworks/deps/steamworks_sdk -p${STEAMWORKS_SDK_ARCHIVE_PASSWORD} -r -y -aoa`
);
