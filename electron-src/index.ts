// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, dialog } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import findProcess from "find-process";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 1266,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js"),
      devTools: isDev,
    },
  });

  mainWindow.webContents.openDevTools;

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

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log("new message");
  // event.sender.send("message", message);
});

ipcMain.on("check", async (event: IpcMainEvent, message: any) => {
  console.log("Check epta");
  const list = await findProcess("name", "DarkSoulsRemastered.exe");
  if (list?.length) {
    console.log("Process found", list?.length);
  } else {
    console.log("Failed to found process");
  }
  // event.sender.send("message", message);
});

ipcMain.on("chooseFolder", async (event: IpcMainEvent, message: any) => {
  const folders = dialog.showOpenDialogSync({ properties: ["openDirectory"] });
  console.log("folders", folders);
  return folders;
});
