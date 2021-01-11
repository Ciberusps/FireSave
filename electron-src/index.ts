import cron from "node-cron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { autoUpdater } from "electron-updater";
import { BrowserWindow, app, ipcMain, protocol, dialog, shell } from "electron";
import { join } from "path";
import { format } from "url";

import Saves from "./utils/saves";
import Store from "./utils/store";
import AppTray from "./utils/tray";
import Shortcuts from "./utils/shortcuts";
import Scheduler from "./utils/scheduler";
import {
  getFileName,
  getFileNameWithExtension,
  getFilePath,
  getId,
  isGameExist,
} from "./utils";
import { fillSteamGameInfo } from "./utils/steam";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  autoUpdater.checkForUpdatesAndNotify();

  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = request.url.replace("file:///", "");
    callback(pathname);
  });

  await prepareNext("./renderer");

  Scheduler.runAutoSaves();

  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 1266,
    minimizable: true,
    maximizable: true,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: !isDev,
      preload: join(__dirname, "preload.js"),
      devTools: isDev,
    },
  });

  isDev && mainWindow.setPosition(-1080, 690);

  const url = isDev
    ? "http://localhost:8000/"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  AppTray.init(mainWindow);

  mainWindow.on("minimize", () => {
    mainWindow.hide();
  });

  mainWindow.on("restore", () => {
    mainWindow.show();
  });

  mainWindow.on("close", (event) => {
    console.log("isQuiting", AppTray.getIsQuiting());
    if (!AppTray.getIsQuiting()) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  Store.onDidAnyChange((newVal) => {
    console.log("State changed");
    mainWindow.webContents.send("stateUpdate", newVal);
  });

  Store.set("version", app.getVersion());

  mainWindow.loadURL(url);

  mainWindow.maximize();

  Shortcuts.registerSaveKey(Store.store.saveShortcut);
});

app.on("will-quit", () => {
  Shortcuts.unregisterAll();
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

ipcMain.handle("chooseStorePath", async () => {
  const folders = dialog.showOpenDialogSync({ properties: ["openDirectory"] });
  console.log("folders", folders);
  if (folders?.[0]) {
    Store.set("storePath", folders[0]);
  }
});

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

ipcMain.handle("createGame", async (event, { exePath, saves }: TCreateGamePayload) => {
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

ipcMain.handle("editGame", async (event, { game, exePath, saves }: TEditGamePayload) => {
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

ipcMain.handle("removeGame", async (event, id) => {
  // @ts-ignore
  Store.delete(`games.${id}`);
  return true;
});

ipcMain.handle("toggleAutoSave", async () => {
  Store.set("isAutoSaveOn", !Store.store.isAutoSaveOn);
});

ipcMain.handle("saveGame", async (_, gameId) => {
  // TODO: dont create screenshot if game not runned
  Saves.save(Store.store.games[gameId], "manualsave");
});

ipcMain.handle("loadSavePoint", async (_, gameId: string, savePointId: string) => {
  Saves.load(gameId, savePointId);
});

ipcMain.handle("removeSavePoint", async (_, gameId: string, savePointId: string) => {
  Saves.remove(gameId, savePointId);
});

ipcMain.handle("revealInFileExplorer", async (_, path: string) => {
  console.log("test", path);
  shell.showItemInFolder(path);
});

ipcMain.handle("getState", async () => {
  return Store.store;
});

ipcMain.handle("openProfileLink", async () => {
  shell.openExternal("https://github.com/Ciberusps");
});

ipcMain.handle("openPcGamingWiki", async () => {
  shell.openExternal("https://pcgamingwiki.com");
});

ipcMain.handle("changeAutoSaveInterval", async (_, newVal: number) => {
  Store.set("autoSaveMinutes", newVal);
});

ipcMain.handle("openLatestReleasePage", async () => {
  // https://github.com/Ciberusps/FireSave/releases/latest
  shell.openExternal("https://cutt.ly/kjxFNiB");
});
