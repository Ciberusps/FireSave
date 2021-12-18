import { ipcMain } from "electron";
import isDev from "electron-is-dev";

import Stores from "../utils/stores";
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

ipcMain.handle("getSettingsStore", async () => {
  return Stores.Settings.store;
});

ipcMain.handle("getPersistentStore", async () => {
  return Stores.Persistent.store;
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
};

ipcMain.handle("changeSettings", (_, newSettings: TSettings) => {
  Stores.Settings.set("isAutoSaveOn", newSettings.isAutoSaveOn);
  Stores.Settings.set("autoSaveMinutes", newSettings.autoSaveMinutes);
  Scheduler.runAutoSaves();
  return true;
});

ipcMain.handle("changePersistentStore", (_, newSettings: TPersistentStore) => {
  Stores.Persistent.set("settingsStorePath", newSettings.settingsStorePath);
  return true;
});
