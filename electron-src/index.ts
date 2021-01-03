import cron from "node-cron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { BrowserWindow, app, ipcMain, IpcMainEvent, dialog } from "electron";
import { join } from "path";
import { format } from "url";

import Saves from "./utils/saves";
import Store from "./utils/store";
import {
  getFileName,
  getFileNameWithExtension,
  getFilePath,
  getGameId,
  isGameExist,
} from "./utils";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
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
    webPreferences: {
      nodeIntegration: false,
      // nodeIntegration: true,
      // enableRemoteModule: true,
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

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.webContents.send("stateUpdate", Store.store);
  });

  Store.onDidAnyChange((newVal) => {
    console.log("State changed");
    mainWindow.webContents.send("stateUpdate", newVal);
  });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log("new message");
  // event.sender.send("message", message);
});

ipcMain.on("check", async (event: IpcMainEvent, message: any) => {
  console.log("Check epta");
  // event.sender.send("message", message);
});

ipcMain.on("stateChanged", async (event: IpcMainEvent, message: any) => {
  console.log("Check epta");
  // event.sender.send("message", message);
});

ipcMain.on("chooseStorePath", async (event: IpcMainEvent, message: any) => {
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
    const gameName = getFileName(exePath);
    console.log("SEND BACK");
    return exePath;
  } else {
    console.error("GAME ALREADY EXISTS");
    return null;
  }
});

ipcMain.handle("chooseSavesPath", async () => {
  const saveFiles = dialog.showOpenDialogSync({
    properties: ["openFile", "multiSelections"],
  });
  if (!saveFiles) return null;
  const savesPath = getFilePath(saveFiles[0]);
  const files = saveFiles.map((f) => getFileNameWithExtension(f));
  return { path: savesPath, files };
});

ipcMain.handle("createGame", async (event, { exePath, saves }) => {
  // console.log(args);
  // if (!exePath) return null;
  if (!isGameExist(exePath)) {
    const id = getGameId(exePath);
    const gameName = getFileName(exePath);
    Store.set(`games.${id}`, {
      name: gameName,
      exePath,
      saves,
    });
    return true;
  } else {
    console.error("GAME ALREADY EXISTS");
    return false;
  }
});

ipcMain.handle("editGame", async (event, { exePath, saves }) => {
  if (isGameExist(exePath)) {
    const gameName = getFileName(exePath);
    const newGames = Store.store.games;
    const gameIdx = newGames.findIndex((g) => g.exePath === exePath);
    if (gameIdx === -1) return false;
    newGames[gameIdx].name = gameName;
    newGames[gameIdx].exePath = exePath;
    newGames[gameIdx].saves = saves;
    Store.set("games", newGames);
    return true;
  } else {
    console.error("GAME ALREADY EXISTS");
    return false;
  }
});

ipcMain.handle("removeGame", async (event, exePath) => {
  const newGames = Store.store.games;
  const gameIdx = newGames.findIndex((g) => g.exePath === exePath);
  if (gameIdx === -1) return false;
  newGames.splice(gameIdx, 1);
  Store.delete(`games.${}`, newGames);
  return true;
});

ipcMain.on("toggleAutoSave", async () => {
  Store.set("isAutoSaveOn", !Store.store.isAutoSaveOn);
});
