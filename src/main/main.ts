/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from "path";
import { app, BrowserWindow, shell, ipcMain, nativeTheme } from "electron";
import { autoUpdater } from "electron-updater";
// import isDev from "electron-is-dev";
import log from "electron-log";
// import { format } from "url";

import { resolveHtmlPath } from "./utils";
// import Stores from "./utils/stores";
import MenuBuilder from "./utils/menu";
import { RESOURCES_PATH } from "./utils/config";
import "./handlers";
// import AppTray from "./utils/tray";
// import WindowUtils from "./utils/window";
// import Scheduler from "./utils/scheduler";
// import Shortcuts from "./utils/shortcuts";

export default class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on("ipc-example", async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply("ipc-example", msgTemplate("pong"));
});

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDevelopment) {
  require("electron-debug")();
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const onReady = async () => {
  createWindow();
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();

  // MYFJDSLKJFPOSIJPOFIEJOPIFJWPOIJ

  // protocol.registerFileProtocol("file", (request, callback) => {
  //   const pathname = request.url.replace("file:///", "");
  //   callback(pathname);
  // });

  // Scheduler.runAutoSaves();

  // nativeTheme.themeSource = "dark";

  // const { isMaximized, ...posAndSize } = WindowUtils.loadPositionAndSize();
  // mainWindow = new BrowserWindow({
  //   ...posAndSize,
  //   minimizable: true,
  //   maximizable: true,
  //   webPreferences: {
  //     contextIsolation: true,
  //     webSecurity: !isDev,
  //     preload: path.join(__dirname, "preload.js"),
  //     devTools: isDev,
  //   },
  // });
  // if (isMaximized) mainWindow.maximize();

  // const url = isDev
  //   ? "http://localhost:8000/"
  //   : format({
  //       pathname: path.join(__dirname, "../renderer/out/index.html"),
  //       protocol: "file:",
  //       slashes: true,
  //     });

  // AppTray.init(mainWindow);

  // mainWindow.on("minimize", () => {
  //   mainWindow?.hide();
  // });

  // mainWindow.on("restore", () => {
  //   mainWindow?.show();
  // });

  // mainWindow.on("close", (event) => {
  //   if (!AppTray.getIsQuiting()) {
  //     event.preventDefault();
  //     mainWindow.hide();
  //   }

  //   WindowUtils.savePositionAndSize(mainWindow);

  //   return false;
  // });

  // Stores.Persistent.onDidAnyChange((newVal) => {
  //   mainWindow.webContents.send("persistentStoreUpdate", newVal);
  // });

  // Stores.Settings.onDidAnyChange((newVal) => {
  //   mainWindow.webContents.send("stateUpdate", newVal);
  // });

  // Stores.Settings.set("version", app.getVersion());

  // mainWindow.loadURL(url);

  // Shortcuts.registerSaveKey(Stores.Settings.store.saveShortcut);

  // mainWindow.webContents.on("new-window", (event, url) => {
  //   event.preventDefault();
  //   shell.openExternal(url);
  // });
};

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", onReady);
app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
