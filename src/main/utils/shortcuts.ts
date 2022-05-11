import { globalShortcut } from "electron";

import Saves from "./saves";

// @ts-ignore
const registerSaveKey = (key: string) => {
  // TODO: check what games run and save
  const ret = globalShortcut.register("F5", () => {
    console.log("F5 is pressed");
    Saves.saveRunningGames();
  });

  if (!ret) {
    console.log("registration failed");
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered("F5"));
};

const unregisterAll = () => {
  globalShortcut.unregisterAll();
};

const Shortcuts = {
  registerSaveKey,
  unregisterAll,
};

export default Shortcuts;
