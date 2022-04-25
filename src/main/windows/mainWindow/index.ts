import { BrowserWindow, shell } from "electron";

import Stores from "../../utils/stores";
import AppTray from "../../utils/tray";
import MenuBuilder from "./menu";
import { START_MINIMIZED } from "../../utils/config";
import { resolveHtmlPath } from "../../utils";

class MainWindow extends BrowserWindow {
  constructor(props: Electron.BrowserWindowConstructorOptions | undefined) {
    const { isMaximized, ...posAndSize } = Stores.Settings.store.mainWindow;
    super({ ...posAndSize, ...props });

    if (isMaximized) this.maximize();

    AppTray.init(this);

    Stores.Persistent.onDidAnyChange((newVal) => {
      this.webContents.send("persistentStoreUpdate", newVal);
    });

    Stores.Settings.onDidAnyChange((newVal) => {
      this.webContents.send("stateUpdate", newVal);
    });

    this.on("ready-to-show", this.onReadyToShow.bind(this));
    this.on("minimize", this.onMinimize.bind(this));
    this.on("restore", this.onRestore.bind(this));
    this.on("close", this.onClose.bind(this));

    this.loadURL(resolveHtmlPath("index.html"));

    const menuBuilder = new MenuBuilder(this);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    this.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: "deny" };
    });
  }

  onReadyToShow() {
    if (START_MINIMIZED) {
      this.minimize();
    } else {
      this.show();
    }
  }

  onMinimize() {
    this.hide();
  }

  onRestore() {
    this.show();
  }

  onClose(event: Electron.Event) {
    if (!AppTray.getIsQuiting()) {
      event.preventDefault();
      this.hide();
    }
    this.savePositionAndSize();
    return false;
  }

  savePositionAndSize() {
    const position = this.getPosition();
    const size = this.getSize();
    const isMaximized = this.isMaximized();

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
