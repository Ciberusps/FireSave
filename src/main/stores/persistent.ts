import ElectronStore from "electron-store";
import isDev from "electron-is-dev";

import FileSystem from "../utils/fileSystem";
import { DEFAULT_STORES_PATH } from "../utils/config";

// persistent store in `%AppData%/FireSave/config.json` exists even after app uninstall
const persistentStore = new ElectronStore<TPersistentStore>({
  name: isDev ? "config.dev" : "config",
  defaults: {
    settingsStorePath: undefined,
    gamesStorePath: undefined,
    savesFolder: FileSystem.normalizeUpath(DEFAULT_STORES_PATH),
  },
  migrations: {
    "0.6.1": (store) => {
      console.log("MIGRATION RUNNED");

      if (
        store.store.settingsStorePath &&
        !FileSystem.isPathsEqual(
          store.store.settingsStorePath,
          DEFAULT_STORES_PATH
        )
      ) {
        console.log("move");
        FileSystem.copyFolder(
          FileSystem.normalizePathForCurrentOS(store.store.settingsStorePath),
          DEFAULT_STORES_PATH,
          {
            recursive: true,
            overwrite: true,
          }
        );
        store.delete("settingsStorePath");
        store.delete("gamesStorePath");
      }
    },
    "0.6.3": (store) => {
      console.log("MIGRATION RUNNED");
      store.set(
        "savesFolder",
        FileSystem.normalizeUpath(store.store.savesFolder)
      );
    },
  },
});

console.log("pers store path", persistentStore.path);

export default persistentStore;
