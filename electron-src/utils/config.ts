import path from "path";
import { app } from "electron";

export const GA_TRACKING_ID = "UA-71818957-10";

export const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, "assets")
  : path.join(__dirname, "../../assets");
