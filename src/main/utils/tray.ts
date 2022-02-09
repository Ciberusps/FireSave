import { app, BrowserWindow, Menu, Tray } from "electron";

import { getAssetPath } from ".";

let tray = null;
let isQuiting = false;

const getIsQuiting = () => isQuiting;

const init = (window: BrowserWindow) => {
  const appIconPath = getAssetPath("tray.png");
  tray = new Tray(appIconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => {
        window.show();
      },
    },
    {
      label: "Exit",
      click: () => {
        isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.on("double-click", () => {
    window.show();
  });
  tray.setToolTip("FireSave");
  tray.setContextMenu(contextMenu);
};

const AppTray = {
  getIsQuiting,
  init,
};

export default AppTray;
