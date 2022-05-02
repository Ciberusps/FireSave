import path from "path";
import { app } from "electron";

export const { NODE_ENV, PORT, START_MINIMIZED } = process.env;

export const SENTRY_DSN =
  "https://8067b69a6c824137afacdf25c3d8987b@o240795.ingest.sentry.io/5594347";

export const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, "assets")
  : path.join(__dirname, "../../../assets");

export const STEAM_APP_ID = 1904150;

export const DEFAULT_STORES_PATH = path.join(
  app.getPath("userData"),
  "FireSave_Data"
);

export const APP_VERSION = app.getVersion();

export const PLATFORM = process.platform;
