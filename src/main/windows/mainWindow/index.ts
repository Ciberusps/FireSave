import { app, BrowserWindow, shell } from "electron";
import isDev from "electron-is-dev";

import Stores from "../../stores";

import AppTray from "../../utils/tray";
import { resolveHtmlPath } from "../../utils";

class MainWindow extends BrowserWindow {
  private appTray: AppTray;
  private isCurrentlyMaximized: boolean = false;
  private permitQuit: boolean = false;

  constructor(props: Electron.BrowserWindowConstructorOptions | undefined) {
    const {
      isStartingInTray,
      mainWindow: { isMaximized, ...posAndSize },
    } = Stores.Settings.store;

    super({
      ...posAndSize,
      show: !isStartingInTray,
      ...props,
    });

    if (isMaximized) {
      if (!isStartingInTray) this.maximize();
      this.isCurrentlyMaximized = true;
    }

    this.appTray = new AppTray({
      isWindowVisible: this.isVisible(),
      onClickShow: this.showWindow.bind(this),
      onClickHide: this.hideWindow.bind(this),
      onClickQuit: this.quitApp.bind(this),
    });

    Stores.Persistent.onDidAnyChange((newVal) => {
      this.webContents.send("onPersistentStoreUpdate", newVal);
    });
    Stores.Settings.onDidAnyChange((newVal) => {
      this.webContents.send("onSettingsStoreUpdate", newVal);
    });
    Stores.Games.onDidAnyChange((newVal) => {
      this.webContents.send("onGamesStoreUpdate", newVal);
    });

    this.on("minimize", this.hideWindow.bind(this));
    this.on("maximize", this.onMaximize.bind(this));
    this.on("unmaximize", this.onUnmaximize.bind(this));
    this.on("restore", this.showWindow.bind(this));
    this.on("close", this.onClose.bind(this));

    this.loadURL(resolveHtmlPath("index.html"));

    // Open urls in the user's browser
    this.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: "deny" };
    });
  }

  showWindow() {
    if (this.isVisible()) return;

    const {
      mainWindow: { isMaximized },
    } = Stores.Settings.store;

    // if window was maximized but started in tray, maximize should be restored
    if (isMaximized) {
      this.maximize();
      this.focus();
    } else {
      // else just show the window
      this.show();
    }

    this.appTray.updateContextMenu(true);
  }

  hideWindow() {
    this.savePositionAndSize();

    this.hide();
    this.appTray.updateContextMenu(false);
  }

  quitApp() {
    this.permitQuit = true;
    app.quit();
  }

  onMaximize() {
    this.isCurrentlyMaximized = true;
  }

  onUnmaximize() {
    this.isCurrentlyMaximized = false;
  }

  onClose(event: Electron.Event) {
    this.savePositionAndSize();
    if (!this.permitQuit && !isDev) {
      event.preventDefault();
      this.hideWindow();
    }
    return false;
  }

  savePositionAndSize() {
    const position = this.getPosition();
    const size = this.getSize();
    const isMaximized = this.isCurrentlyMaximized;

    const newWindowState = {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
      isMaximized,
    };
    Stores.Settings.set("mainWindow", newWindowState);
  }
}

export default MainWindow;
