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
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  nativeTheme,
  protocol,
} from "electron";
import { autoUpdater } from "electron-updater";
import isDev from "electron-is-dev";
import log from "electron-log";
// @ts-ignore
import greenworks from "greenworks";

import AppTray from "./utils/tray";
import Stores from "./utils/stores";
import Scheduler from "./utils/scheduler";
import Shortcuts from "./utils/shortcuts";
import MenuBuilder from "./utils/menu";
import WindowUtils from "./utils/window";
import { RESOURCES_PATH, START_MINIMIZED } from "./utils/config";
import { resolveHtmlPath } from "./utils";
import "./handlers";

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
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = request.url.replace("file:///", "");
    callback(pathname);
  });

  Scheduler.runAutoSaves();
  nativeTheme.themeSource = "dark";

  const isInited = greenworks.init();
  console.log({ isInited });
  if (!isInited) return;

  console.log({
    steamId: greenworks.getSteamId(),
    appInstall: greenworks.getAppInstallDir(480),
  });

  greenworks.getCloudQuota((total_bytes, available_bytes) => {
    console.log("Cloud Quota");
    console.log({
      totalMB: total_bytes / 1000 / 1000,
      availableMB: available_bytes / 1000 / 1000,
    });
  });

  createWindow();
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const { isMaximized, ...posAndSize } = WindowUtils.loadPositionAndSize();
  mainWindow = new BrowserWindow({
    ...posAndSize,
    minimizable: true,
    maximizable: true,
    // show: false,
    // width: 1024,
    // height: 728,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      contextIsolation: true,
      webSecurity: !isDev,
      preload: path.join(__dirname, "preload.js"),
      devTools: isDev,
    },
  });
  if (isMaximized) mainWindow.maximize();

  AppTray.init(mainWindow);

  Stores.Persistent.onDidAnyChange((newVal) => {
    mainWindow?.webContents.send("persistentStoreUpdate", newVal);
  });

  Stores.Settings.onDidAnyChange((newVal) => {
    mainWindow?.webContents.send("stateUpdate", newVal);
  });

  Stores.Settings.set("version", app.getVersion());

  Shortcuts.registerSaveKey(Stores.Settings.store.saveShortcut);

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on("minimize", () => {
    // if (!mainWindow) throw new Error('"mainWindow" is not defined');
    mainWindow?.hide();
  });

  mainWindow.on("restore", () => {
    // if (!mainWindow) throw new Error('"mainWindow" is not defined');
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("close", (event) => {
    // if (!mainWindow) throw new Error('"mainWindow" is not defined');
    if (!AppTray.getIsQuiting()) {
      event.preventDefault();
      mainWindow?.hide();
    }
    if (mainWindow) WindowUtils.savePositionAndSize(mainWindow);
    return false;
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
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on("will-quit", () => {
  Shortcuts.unregisterAll();
});
app.on("window-all-closed", () => {
  Shortcuts.unregisterAll();
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
