import path from "path";
import { app } from "electron";
import FileSystem from "./fileSystem";
// @ts-ignore
// import appRoot from "app-root-path";
// const rootPath = require("electron-root-path").rootPath;

export const { NODE_ENV, PORT, START_MINIMIZED, platform } = process.env;

export const SENTRY_DSN =
  "https://8067b69a6c824137afacdf25c3d8987b@o240795.ingest.sentry.io/5594347";

export const RESOURCES_PATH = app.isPackaged
  ? process.resourcesPath
  : path.join(__dirname, "../../../");

export const ASSETS_PATH = path.join(RESOURCES_PATH, "assets");

export const STEAM_APP_ID = 1904150;

// const isMac = platform === "darwin";
// const isDev = NODE_ENV === "development";
// const prependPath = isMac && !isDev ? process.resourcesPath : ".";

// console.log({ prependPath, execPath: process.execPath });

// let APP_ROOT_PATH = path.join(prependPath, process.resourcesPath);

// console.log(APP_ROOT_PATH);

// // TODO: replacement required only in production
// if (process.platform === "darwin") {
//   APP_ROOT_PATH = APP_ROOT_PATH.replace(
//     "/FireSave.app/Contents/Resources/app.asar/dist/main",
//     ""
//   );
// }
let APP_ROOT_PATH = app.getAppPath();
if (app.isPackaged && process.platform === "win32") {
  APP_ROOT_PATH = path.join(APP_ROOT_PATH, "../..");
}
if (app.isPackaged && process.platform === "linux") {
  APP_ROOT_PATH = path.join(APP_ROOT_PATH, "../..");
}
if (app.isPackaged && process.platform === "darwin") {
  APP_ROOT_PATH = path.join(APP_ROOT_PATH, "../..");
}

export const DEFAULT_STORES_PATH = path.normalize(
  path.join(APP_ROOT_PATH, "FireSave_Data")
);
console.log(DEFAULT_STORES_PATH);

export const APP_VERSION = app.getVersion();

export const PLATFORM = process.platform;

export const SCREENSHOTS_FOLDER_NAME = "__screenshots";
