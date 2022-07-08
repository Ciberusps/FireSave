import { ipcMain, screen } from "electron";

import SavesHandlers, { TSavesHandlers } from "./saves";
import GamesHandlers, { TGamesHandlers } from "./game";
import FileSystemHandlers, { TFileSystemHandlers } from "./fileSystem";

import Stores from "../stores";
import Scheduler from "../utils/scheduler";
import { getGlobby } from "../utils";

type TCommonHandlers = {
  getPersistentStore: IPC.THandler<"getPersistentStore">;
  getSettingsStore: IPC.THandler<"getSettingsStore">;
  getGamesStore: IPC.THandler<"getGamesStore">;
  test: IPC.THandler<"test">;

  changeSettings: IPC.THandler<"changeSettings">;
  changePersistentStore: IPC.THandler<"changePersistentStore">;
  getGlobby: IPC.THandler<"getGlobby">;
  getDisplays: IPC.THandler<"getDisplays">;
};

const commonHandlers: TCommonHandlers = {
  getPersistentStore: async () => Stores.Persistent.store,
  getSettingsStore: async () => Stores.Settings.store,
  getGamesStore: async () => Stores.Games.store,
  //
  test: async () => {},
  changeSettings: async (_, newSettings) => {
    Stores.Settings.set("isAutoSaveOn", newSettings.isAutoSaveOn);
    Stores.Settings.set("autoSaveMinutes", newSettings.autoSaveMinutes);
    Stores.Settings.set("selectedDisplay", newSettings.selectedDisplay);

    Scheduler.start();
    return true;
  },
  changePersistentStore: async (_, newSettings) => {
    Stores.Persistent.set("savesFolder", newSettings.savesFolder);
    return true;
  },
  getGlobby: async (_, options) => getGlobby(options),
  getDisplays: async () => screen.getAllDisplays(),
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
