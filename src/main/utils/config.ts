import path from "path";
import { app } from "electron";
// @ts-ignore
import { rootPath } from "electron-root-path";
// @ts-ignore
import appRoot from "app-root-path";

export const { NODE_ENV, PORT, START_MINIMIZED, cwd } = process.env;

export const SENTRY_DSN =
  "https://8067b69a6c824137afacdf25c3d8987b@o240795.ingest.sentry.io/5594347";

export const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, "assets")
  : path.join(__dirname, "../../../assets");

export const STEAM_APP_ID = 1904150;

const APP_ROOT_PATH = appRoot.toString();
export const DEFAULT_STORES_PATH = path.join(APP_ROOT_PATH, "FireSave_Data");
console.log({
  cwd: process.cwd(),
  appRootPath: appRoot,
  __dirname,
  DEFAULT_STORES_PATH,
  rootPath,
});

export const APP_VERSION = app.getVersion();

export const PLATFORM = process.platform;

export const SCREENSHOTS_FOLDER_NAME = "__screenshots";
