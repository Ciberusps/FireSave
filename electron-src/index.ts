import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import { autoUpdater } from "electron-updater";
import { BrowserWindow, app, protocol } from "electron";
import { join } from "path";
import { format } from "url";

import Store from "./utils/store";
import AppTray from "./utils/tray";
import Shortcuts from "./utils/shortcuts";
import Scheduler from "./utils/scheduler";
import Analytics from "./utils/analytics";
import WindowUtils from "./utils/window";
import "./handlers";

const onReady = async () => {
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
      contextIsolation: true,
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
    if (!AppTray.getIsQuiting()) {
      event.preventDefault();
      mainWindow.hide();
    }

    WindowUtils.savePositionAndSize(mainWindow);

    return false;
  });

  Store.onDidAnyChange((newVal) => {
    mainWindow.webContents.send("stateUpdate", newVal);
  });

  Store.set("version", app.getVersion());

  mainWindow.loadURL(url);

  WindowUtils.loadPositionAndSize(mainWindow);

  Shortcuts.registerSaveKey(Store.store.saveShortcut);

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
