import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import * as Sentry from "@sentry/electron";
import { autoUpdater } from "electron-updater";
import { BrowserWindow, app, protocol, shell, nativeTheme } from "electron";
import { join } from "path";
import { format } from "url";

import Stores from "./utils/stores";
import AppTray from "./utils/tray";
import Shortcuts from "./utils/shortcuts";
import Scheduler from "./utils/scheduler";
import Analytics from "./utils/analytics";
import WindowUtils from "./utils/window";
import { SENTRY_DSN } from "./utils/config";
import "./handlers";

Sentry.init({
  dsn: SENTRY_DSN,
});

const onReady = async () => {
  autoUpdater.checkForUpdatesAndNotify();

  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = request.url.replace("file:///", "");
    callback(pathname);
  });

  await prepareNext("./renderer");

  Scheduler.runAutoSaves();

  nativeTheme.themeSource = "dark";

  const { isMaximized, ...posAndSize } = WindowUtils.loadPositionAndSize();
  const mainWindow = new BrowserWindow({
    ...posAndSize,
    minimizable: true,
    maximizable: true,
    webPreferences: {
      contextIsolation: true,
      webSecurity: !isDev,
      preload: join(__dirname, "preload.js"),
      devTools: isDev,
    },
  });
  if (isMaximized) mainWindow.maximize();

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
    if (!AppTray.getIsQuiting()) {
      event.preventDefault();
      mainWindow.hide();
    }

    WindowUtils.savePositionAndSize(mainWindow);

    return false;
  });

  Stores.Persistent.onDidAnyChange((newVal) => {
    mainWindow.webContents.send("persistentStoreUpdate", newVal);
  });

  Stores.Settings.onDidAnyChange((newVal) => {
    mainWindow.webContents.send("stateUpdate", newVal);
  });

  Stores.Settings.set("version", app.getVersion());

  mainWindow.loadURL(url);

  Shortcuts.registerSaveKey(Stores.Settings.store.saveShortcut);

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  Analytics.init();
};

const onWillQuit = () => {
  Shortcuts.unregisterAll();
};

// Prepare the renderer once the app is ready
app.on("ready", onReady);
app.on("will-quit", onWillQuit);

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
