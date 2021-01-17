import { ipcMain, dialog, shell } from "electron";
import isDev from "electron-is-dev";

import Saves from "../utils/saves";
import Store from "../utils/store";
import Scheduler from "../utils/scheduler";
import Analytics from "../utils/analytics";
import {
  getFileName,
  getFileNameWithExtension,
  getFilePath,
  getId,
  isGameExist,
} from "../utils";
import { fillSteamGameInfo } from "../utils/steam";
import { RESOURCES_PATH } from "../utils/config";

ipcMain.handle(
  "chooseStorePath",
  async (): Promise<string | null> => {
    const folders = dialog.showOpenDialogSync({ properties: ["openDirectory"] });
    console.log("folders", folders);
    if (folders?.[0]) return folders[0];
    return null;
  }
);

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

ipcMain.handle("chooseSavesPath", async (_, defaultPath?: string) => {
  const saveFiles = dialog.showOpenDialogSync({
    properties: [
      "openFile",
      // TODO: add multiple files saves support
      // , "multiSelections"
    ],
    defaultPath,
  });
  if (!saveFiles) return null;
  const savesPath = getFilePath(saveFiles[0]);
  const files = saveFiles.map((f) => getFileNameWithExtension(f));
  return { path: savesPath, files };
});

type TCreateGamePayload = {
  exePath: string;
  saves: TSaves;
};

ipcMain.handle("createGame", async (_, { exePath, saves }: TCreateGamePayload) => {
  if (!isGameExist(exePath)) {
    const id = getId(exePath);
    const name = getFileName(exePath);
    const newGame: TGame = {
      id,
      name,
      exePath,
      saves,
      stats: { allSavesCount: 0, autoSaveCount: 0, manualSaveCount: 0 },
    };
    Store.set(`games.${id}`, newGame);

    Analytics.sendEvent({ category: "games", action: "added", labels: [name] });

    const isSteamGame = exePath.includes("steamapps");
    if (isSteamGame) fillSteamGameInfo(newGame);

    return true;
  } else {
    console.error("GAME ALREADY EXISTS");
    return false;
  }
});

type TEditGamePayload = {
  game: TGame;
  exePath: string;
  saves: TSaves;
};

ipcMain.handle("editGame", async (_, { game, exePath, saves }: TEditGamePayload) => {
  const oldId = game.id;
  const newId = getId(exePath);
  const newGameName = getFileName(exePath);
  game.id = newId;
  game.name = newGameName;
  game.exePath = exePath;
  game.saves = saves;
  if (oldId !== newId) {
    // @ts-ignore
    Store.delete(`games.${oldId}`);
  }
  Store.set(`games.${newId}`, game);
  return true;
});

ipcMain.handle("removeGame", async (_, id) => {
  // @ts-ignore
  Store.delete(`games.${id}`);
  return true;
});

ipcMain.handle("toggleAutoSave", async () => {
  Store.set("isAutoSaveOn", !Store.store.isAutoSaveOn);
  Scheduler.runAutoSaves();
});

ipcMain.handle("saveGame", async (_, gameId) => {
  // TODO: dont create screenshot if game not runned
  Saves.save(Store.store.games[gameId], "manualsave");
});

ipcMain.handle("loadSavePoint", (_, gameId: string, savePointId: string) => {
  return Saves.load(gameId, savePointId);
});

ipcMain.handle("removeSavePoint", async (_, gameId: string, savePointId: string) => {
  Saves.remove(gameId, savePointId);
});

ipcMain.handle("revealInFileExplorer", async (_, path: string) => {
  shell.showItemInFolder(path);
});

ipcMain.handle("getState", async () => {
  return Store.store;
});

ipcMain.handle("changeAutoSaveInterval", async (_, newVal: number) => {
  Store.set("autoSaveMinutes", newVal);
  Scheduler.runAutoSaves();
});

ipcMain.handle("analyticsPageView", async (_, url: string) => {
  Analytics.pageView(url);
});

ipcMain.handle("getConfig", () => {
  console.log("isDev", isDev);
  return {
    RESOURCES_PATH,
    IS_DEV: isDev,
  };
});
