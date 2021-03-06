import path from "path";
import { app } from "electron";

export const GA_TRACKING_ID = "UA-71818957-10";

export const SENTRY_DSN =
  "https://8067b69a6c824137afacdf25c3d8987b@o240795.ingest.sentry.io/5594347";

export const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, "assets")
  : path.join(__dirname, "../../assets");
