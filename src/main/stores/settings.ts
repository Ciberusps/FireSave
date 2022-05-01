import ElectronStore from "electron-store";

import persistentStore from "./persistent";

import { APP_VERSION } from "../utils/config";

const settingsStore = new ElectronStore<TSettingsStore>({
  // TODO: wait for pr https://github.com/sindresorhus/electron-store/pull/225
  // @ts-ignore
  projectVersion: APP_VERSION,
  // TODO: should be app folder, not %appdata%
  cwd: persistentStore.store.settingsStorePath,
  name: "settings",
  defaults: {
    mainWindow: {
      x: 0,
      y: 0,
      width: 1920,
      height: 1080,
      isMaximized: true,
    },
    // TODO: minimize on start or start in tray?
    // minimizeOnStart: true
    isAutoSaveOn: true,
    autoSaveMinutes: 15,
    saveShortcut: "F5",
    version: "unknown",
    runtimeValues: {
      isLoadingApp: true,
    },
    envs: {
      IS_DEV: false,
      PLATFORM: process.platform,
      RESOURCES_PATH: "",
    },
  },

  migrations: {
    // "1.0.0": (settings) => {
    //   console.log("MIGRATION RUNNED");
    // },
  },
});

export default settingsStore;
