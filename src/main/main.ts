/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from "path";

import { app, nativeTheme, protocol } from "electron";
import isDev from "electron-is-dev";

import Stores from "./stores";
import Scheduler from "./utils/scheduler";
import Shortcuts from "./utils/shortcuts";
import MainWindow from "./windows/mainWindow";
import SteamworksSDK from "./utils/steamworksSDK";
import Games from "./utils/games";
import { getAssetPath } from "./utils";
import { PLATFORM, RESOURCES_PATH, APP_VERSION } from "./utils/config";
import "./handlers";

const isDevelopment =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

class Main {
  private mainWindow: MainWindow | null = null;

  static onWillQuit() {
    Shortcuts.unregisterAll();
  }

  static onAllWindowsClosed() {
    Shortcuts.unregisterAll();
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  static installExtensions() {
    const installer = require("electron-devtools-installer");
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ["REACT_DEVELOPER_TOOLS"];

    return installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      .catch(console.log);
  }

  constructor() {
    if (process.env.NODE_ENV === "production") {
      const sourceMapSupport = require("source-map-support");
      sourceMapSupport.install();
    }

    if (isDevelopment) {
      require("electron-debug")();
    }

    app.on("will-quit", Main.onWillQuit);
    app.on("window-all-closed", Main.onAllWindowsClosed);

    app.on("ready", this.onReady.bind(this));
    app.on("activate", this.activate.bind(this));
  }

  activate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (this.mainWindow === null) this.createWindow();
  }

  async onReady() {
    SteamworksSDK.init();

    Stores.Settings.set("version", APP_VERSION);
    Stores.Settings.set("runtimeValues.isLoadingApp", true);
    Stores.Settings.set("envs", {
      PLATFORM,
      RESOURCES_PATH,
      IS_DEV: isDev,
    });
    await Games.fillSteamGames();
    Stores.Settings.set("runtimeValues.isLoadingApp", false);

    protocol.registerFileProtocol("file", (request, callback) => {
      const pathname = request.url.replace("file:///", "");
      callback(pathname);
    });

    Scheduler.start();
    nativeTheme.themeSource = "dark";

    this.createWindow();
  }

  onMainWindowClose() {
    this.mainWindow = null;
  }

  async createWindow() {
    if (isDevelopment) {
      await Main.installExtensions();
    }

    this.mainWindow = new MainWindow({
      minimizable: true,
      maximizable: true,
      icon: getAssetPath("icon.png"),
      webPreferences: {
        contextIsolation: true,
        webSecurity: !isDev,
        preload: app.isPackaged
          ? path.join(__dirname, "preload.js")
          : path.join(__dirname, "../../.erb/dll/preload.js"),
        devTools: isDev,
      },
    });

    this.mainWindow.on("closed", this.onMainWindowClose.bind(this));

    Shortcuts.registerSaveKey(Stores.Settings.store.saveShortcut);

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    // new AppUpdater();
  }
}

// eslint-disable-next-line
new Main();
