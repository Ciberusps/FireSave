import isDev from "electron-is-dev";

import Stores from "../utils/stores";
import Scheduler from "../utils/scheduler";
import SteamworksSDK from "../utils/steamworksSDK";
import ipcMain from "../utils/ipcMain";
import { RESOURCES_PATH } from "../utils/config";
import "./game";
import "./saves";
import "./fileSystem";

ipcMain.handle<IPC.TGetSettingsStore>("getSettingsStore", async () => {
  return Stores.Settings.store;
});

ipcMain.handle<IPC.TGetPersistentStore>("getPersistentStore", async () => {
  return Stores.Persistent.store;
});

ipcMain.handle<IPC.TGetConfig>("getConfig", async () => {
  return {
    RESOURCES_PATH,
    IS_DEV: isDev,
  };
});

ipcMain.handle<IPC.TGetQuota>("getQuota", async () => {
  const cloudQuota = await SteamworksSDK.getCloudQuota();
  return {
    totalMB: cloudQuota.totalBytes / 1000 / 1000,
    availableMB: cloudQuota.availableBytes / 1000 / 1000,
  };
});

ipcMain.handle<IPC.TChangeSettings>(
  "changeSettings",
  async (_, newSettings) => {
    Stores.Settings.set("isAutoSaveOn", newSettings.isAutoSaveOn);
    Stores.Settings.set("autoSaveMinutes", newSettings.autoSaveMinutes);
    Scheduler.runAutoSaves();
    return true;
  }
);

ipcMain.handle<IPC.TChangePersistentStore>(
  "changePersistentStore",
  async (_, newSettings) => {
    Stores.Persistent.set("settingsStorePath", newSettings.settingsStorePath);
    return true;
  }
);
