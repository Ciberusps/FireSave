import { ipcMain, dialog } from "electron";
import isDev from "electron-is-dev";

import Store from "../utils/store";
import Analytics from "../utils/analytics";
import Scheduler from "../utils/scheduler";
import { isGameExist } from "../utils";
import { RESOURCES_PATH } from "../utils/config";
import "./game";
import "./saves";
import "./fileSystem";

ipcMain.handle("chooseGameExe", (_, defaultPath?: string) => {
  const exePath = dialog.showOpenDialogSync({
    properties: ["openFile"],
    defaultPath,
    filters: [{ name: "All Files", extensions: ["exe"] }],
  })?.[0];
  if (!exePath) return null;
  if (!isGameExist(exePath)) {
    return exePath;
  } else {
    console.error("GAME ALREADY EXISTS");
    return null;
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
