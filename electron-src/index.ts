import cron from "node-cron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { BrowserWindow, app, ipcMain, IpcMainEvent, dialog } from "electron";
import { join } from "path";
import { format } from "url";

import Saves from "./utils/saves";
import State from "./utils/state";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

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

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// cron.schedule("* * * * *", () => {
//   console.log("running a task every minute");
// });

if (State.saves.isAutoSaveOn) {
  Saves.tryAutoSave();
  setInterval(() => {
    Saves.tryAutoSave();
  }, 10000);
}

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

ipcMain.on("chooseFolder", async (event: IpcMainEvent, message: any) => {
  const folders = dialog.showOpenDialogSync({ properties: ["openDirectory"] });
  console.log("folders", folders);
  return folders;
});
