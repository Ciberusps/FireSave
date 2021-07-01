import { ipcMain } from "electron";
import isDev from "electron-is-dev";

import Store from "../utils/store";
import Analytics from "../utils/analytics";
import Scheduler from "../utils/scheduler";
import { isGameExist } from "../utils";
import { RESOURCES_PATH } from "../utils/config";
import "./game";
import "./saves";
import "./fileSystem";

ipcMain.handle("isGameExist", (_, path: string) => {
  if (!isGameExist(path)) {
    return false;
  } else {
    return true;
  }
});

ipcMain.handle("analyticsPageView", async (_, url: string) => {
  Analytics.pageView(url);
});

ipcMain.handle("getState", async () => {
  return Store.store;
});

ipcMain.handle("getConfig", () => {
  return {
    RESOURCES_PATH,
    IS_DEV: isDev,
  };
});

type TSettings = {
  isAutoSaveOn: boolean;
  autoSaveMinutes: number;
  storePath: string;
};

ipcMain.handle("changeSettings", (_, newSettings: TSettings) => {
  Store.set("isAutoSaveOn", newSettings.isAutoSaveOn);
  Store.set("autoSaveMinutes", newSettings.autoSaveMinutes);
  // Store.set("storePath", newSettings.storePath);
  Scheduler.runAutoSaves();
  return true;
});
