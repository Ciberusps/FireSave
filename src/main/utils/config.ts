import path from "path";
import { app } from "electron";

export const { NODE_ENV, PORT, START_MINIMIZED } = process.env;

export const SENTRY_DSN =
  "https://8067b69a6c824137afacdf25c3d8987b@o240795.ingest.sentry.io/5594347";

export const RESOURCES_PATH = app.isPackaged
  ? process.resourcesPath
  : path.join(__dirname, "../../../");

export const ASSETS_PATH = path.join(RESOURCES_PATH, "assets");

export const STEAM_APP_ID = 1904150;

const APP_ROOT_PATH: string = (() => {
  let result = app.getAppPath();
  if (app.isPackaged) {
    if (process.platform === "win32" || process.platform === "linux") {
      result = path.join(result, "../..");
    }
    if (process.platform === "darwin") {
      result = path.join(result, "../../../..");
    }
  }
  return result;
})();

export const DEFAULT_STORES_PATH = path.normalize(
  path.join(APP_ROOT_PATH, "FireSave_Data")
);

export const APP_VERSION = app.getVersion();

export const PLATFORM = process.platform;

export const SCREENSHOTS_FOLDER_NAME = "__screenshots";
