import { ipcMain, screen } from "electron";

import SavesHandlers, { TSavesHandlers } from "./saves";
import GamesHandlers, { TGamesHandlers } from "./game";
import FileSystemHandlers, { TFileSystemHandlers } from "./fileSystem";

import Stores from "../stores";
import Scheduler from "../utils/scheduler";
import { getGlobby } from "../utils";
import { globToFilesTree } from "../utils/globTree";

type TCommonHandlers = {
  getPersistentStore: IPC.THandler<"getPersistentStore">;
  getSettingsStore: IPC.THandler<"getSettingsStore">;
  getGamesStore: IPC.THandler<"getGamesStore">;

  changeSettings: IPC.THandler<"changeSettings">;
  changePersistentStore: IPC.THandler<"changePersistentStore">;
  getFolderFilesTree: IPC.THandler<"getFolderFilesTree">;
  getDisplays: IPC.THandler<"getDisplays">;
};

const commonHandlers: TCommonHandlers = {
  getPersistentStore: async () => Stores.Persistent.store,
  getSettingsStore: async () => Stores.Settings.store,
  getGamesStore: async () => Stores.Games.store,
  changeSettings: async (_, newSettings) => {
    try {
      Stores.Settings.set("language", newSettings.language);
      Stores.Settings.set("isAutoSaveOn", newSettings.isAutoSaveOn);
      Stores.Settings.set("autoSaveMinutes", newSettings.autoSaveMinutes);
      Stores.Settings.set("selectedDisplay", newSettings.selectedDisplay);
      Stores.Settings.set("isStartingInTray", newSettings.isStartingInTray);

      Scheduler.start();
      return { success: true, message: "Settings changed" };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
  changePersistentStore: async (_, newSettings) => {
    try {
      Stores.Persistent.set("savesFolder", newSettings.savesFolder);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
  getFolderFilesTree: async (_, options) => {
    try {
      const globbyRes = await getGlobby(options);
      const filesTree = globToFilesTree(globbyRes);
      console.info(["getFolderFilesTree()"], { filesTree });
      return {
        success: true,
        result: filesTree,
      };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
  getDisplays: async () => {
    try {
      const displays = screen.getAllDisplays();
      return {
        success: true,
        result: displays,
      };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
};

type THandlersList = TCommonHandlers &
  TSavesHandlers &
  TGamesHandlers &
  TFileSystemHandlers;

const handlers: THandlersList = {
  ...SavesHandlers,
  ...GamesHandlers,
  ...FileSystemHandlers,
  ...commonHandlers,
};

Object.entries(handlers).forEach(([eventName, handler]) => {
  // @ts-ignore
  ipcMain.handle(eventName, handler);
});
