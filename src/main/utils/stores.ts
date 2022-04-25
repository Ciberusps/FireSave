import path from "path";
import { app } from "electron";
import ElectronStore from "electron-store";

const settingsStorePath = path.join(app.getPath("userData"), "FireSave_Data");

// persistent store in app folder config.json
const persistentStore = new ElectronStore<TPersistentStore>({
  defaults: {
    // TODO: rename settingsStorePath
    settingsStorePath,
  },
});

const settingsStore = new ElectronStore<TSettingsStore>({
  cwd: persistentStore.store.settingsStorePath,
  name: "settings",
  defaults: {
    window: {
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
    games: {},
  },
});

const Stores = {
  Persistent: persistentStore,
  Settings: settingsStore,
};

export default Stores;
