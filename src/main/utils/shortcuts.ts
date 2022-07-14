import { globalShortcut } from "electron";

import Saves from "./saves";

// @ts-ignore
const registerSaveKey = (key: string) => {
  // TODO: check what games run and save
  const ret = globalShortcut.register("F5", () => {
    Saves.saveRunningGames();
  });

  if (!ret) {
    console.warn(
      `[shortcuts.ts/registerSaveKey()] Can't register shortcut ${key}`
    );
  }

  console.info(
    `[shortcuts.ts/registerSaveKey()] Shortcut is registered for ${key}?`,
    globalShortcut.isRegistered(key)
  );
};

const unregisterAll = () => {
  globalShortcut.unregisterAll();
};

const Shortcuts = {
  registerSaveKey,
  unregisterAll,
};

export default Shortcuts;
