import { BrowserWindow } from "electron";

import Store from "./store";

const savePositionAndSize = (mainWindow: BrowserWindow) => {
  const position = mainWindow.getPosition();
  const size = mainWindow.getSize();

  const newWindowState = {
    x: position[0],
    y: position[1],
    width: size[0],
    height: size[1],
  };
  console.log("SAVE", newWindowState);
  Store.set("window", newWindowState);
};

const loadPositionAndSize = (mainWindow: BrowserWindow) => {
  const window = Store.store.window;
  console.log("LOAD", window);
  mainWindow.setPosition(window.x, window.y);
  mainWindow.setSize(window.width, window.height);
  if (Store.store.window.x === -8 || Store.store.window.y === -8) {
    mainWindow.maximize();
  }
};

const WindowUtils = {
  savePositionAndSize,
  loadPositionAndSize,
};

export default WindowUtils;
