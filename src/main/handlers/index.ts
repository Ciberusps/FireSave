import isDev from "electron-is-dev";

import Stores from "../stores";
import Scheduler from "../utils/scheduler";
import SteamworksSDK from "../utils/steamworksSDK";
import ipcMain from "../utils/ipcMain";
import { RESOURCES_PATH } from "../utils/config";
import "./game";
import "./saves";
import "./fileSystem";

ipcMain.handle("getPersistentStore", async () => {
  return Stores.Persistent.store;
});
ipcMain.handle("getSettingsStore", async () => {
  return Stores.Settings.store;
});
ipcMain.handle("getGamesStore", async () => {
  return Stores.Games.store;
});

ipcMain.handle("getConfig", async () => {
  return {
    RESOURCES_PATH,
    IS_DEV: isDev,
  };
});

ipcMain.handle("getQuota", async () => {
  const cloudQuota = await SteamworksSDK.getCloudQuota();
  return {
    totalMB: cloudQuota.totalBytes / 1000 / 1000,
    availableMB: cloudQuota.availableBytes / 1000 / 1000,
    test: 323,
    fqvwef: "fqvwef",
  };
});

ipcMain.handle("changeSettings", async (_, newSettings) => {
  Stores.Settings.set("isAutoSaveOn", newSettings.isAutoSaveOn);
  Stores.Settings.set("autoSaveMinutes", newSettings.autoSaveMinutes);
  Scheduler.start();
  return true;
});

ipcMain.handle("changePersistentStore", async (_, newSettings) => {
  Stores.Persistent.set("settingsStorePath", newSettings.settingsStorePath);
  return true;
});

ipcMain.handle("test", async () => {});
