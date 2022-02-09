import { ipcMain } from "electron";
import isDev from "electron-is-dev";

import Stores from "../utils/stores";
import Scheduler from "../utils/scheduler";
import { RESOURCES_PATH } from "../utils/config";
import "./game";
import "./saves";
import "./fileSystem";

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
