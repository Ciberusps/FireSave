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
import {
  getFileName,
  getFileNameWithExtension,
  getFilePath,
  getId,
  isGameExist,
} from "./utils";
import { fillSteamGameInfo } from "./utils/steam";

// let tray: Tray | null = null;
// let isQuiting = false;

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  autoUpdater.checkForUpdatesAndNotify();

  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = request.url.replace("file:///", "");
    callback(pathname);
  });

  await prepareNext("./renderer");

  if (Store.store.isAutoSaveOn) {
    Saves.tryAutoSave();

    // cron.schedule("* * * * *", () => {
    //   console.log("running a task every minute");
    // });

    // console.log("GAME ID", getGameId(Store.store.games[0].exePath));

    setInterval(() => {
      console.log("TRY AUTO SAVE");
      Saves.tryAutoSave();
    }, Store.store.autoSaveMinutes * 60 * 1000);
  }

  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 1266,
    minimizable: true,
    webPreferences: {
      nodeIntegration: false,
      // nodeIntegration: true,
      // enableRemoteModule: true,
      // webSecurity: !isDev,
      webSecurity: false,
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

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.webContents.send("stateUpdate", Store.store);
  });

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

ipcMain.handle("chooseGameExe", () => {
  const exePath = dialog.showOpenDialogSync({ properties: ["openFile"] })?.[0];
  if (!exePath) return null;
  if (!isGameExist(exePath)) {
    return exePath;
  } else {
    console.error("GAME ALREADY EXISTS");
    return null;
  }
});

ipcMain.handle("chooseSavesPath", async () => {
  const saveFiles = dialog.showOpenDialogSync({
    properties: [
      "openFile",
      // , "multiSelections" // TODO: add multiple files saves support
    ],
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
    const newGame: TGame = { id, name, exePath, saves };
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
  Saves.save(Store.store.games[gameId]);
});

ipcMain.handle("loadSavePoint", async (_, gameId: string, savePointId: string) => {
  Saves.load(gameId, savePointId);
});

ipcMain.handle("removeSavePoint", async (_, gameId: string, savePointId: string) => {
  Saves.remove(gameId, savePointId);
});

ipcMain.handle("revealInFileExplorer", async (_, path: string) => {
  shell.showItemInFolder(path);
});
