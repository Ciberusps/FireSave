import ElectronStore from "electron-store";

import persistentStore from "./persistent";

const settingsStore = new ElectronStore<TSettingsStore>({
  // TODO: should be app folder, not %appdata%
  cwd: persistentStore.store.savesFolder,
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
    selectedDisplay: undefined,
    isStartingInTray: false,

    runtimeValues: {
      isLoadingApp: true,
    },
    envs: {
      IS_DEV: false,
      PLATFORM: process.platform,
      RESOURCES_PATH: "",
      IS_STEAMWORKS_AVAILABLE: false,
    },
  },

  migrations: {
    // "1.0.0": (settings) => {
    //   console.log("MIGRATION RUNNED");
    // },
  },
});

export default settingsStore;
