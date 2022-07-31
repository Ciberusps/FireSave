import fs from "fs";
import log from "electron-log";
import isDev from "electron-is-dev";

import { DEFAULT_LOG_FILE_PATH } from "./config";

const init = () => {
  // clean up logs in dev mode
  isDev && fs.writeFileSync(DEFAULT_LOG_FILE_PATH, "", "utf8");

  console.log = log.log;
  console.error = log.error;
  console.info = log.info;
  log.transports.file.resolvePath = () => DEFAULT_LOG_FILE_PATH;

  // Stores.Settings.set("runtimeValues.DEFAULT_STORES_PATH", DEFAULT_STORES_PATH);
};

const Logger = {
  init,
};

export default Logger;
