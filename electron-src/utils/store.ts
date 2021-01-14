import ElectronStore from "electron-store";
import path from "path";

const defaultStorePath = path.resolve("C:/GamesSaves");

const Store = new ElectronStore<TStore>({
  cwd: defaultStorePath,
  defaults: {
    window: {
      x: 0,
      y: 0,
      width: 1920,
      height: 1080,
    },
    // TODO: minimize on start or start in tray?
    // minimizeOnStart: true
    isAutoSaveOn: true,
    autoSaveMinutes: 15,
    saveShortcut: "F5",
    storePath: defaultStorePath,
    version: "unknown",
    games: {},
  },
});

export default Store;
