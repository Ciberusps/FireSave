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
      console.info("[persistentStore.ts/migrations/0.6.1] run migration");

      if (
        store.store.settingsStorePath &&
        !FileSystem.isPathsEqual(
          store.store.settingsStorePath,
          DEFAULT_STORES_PATH
        )
      ) {
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
      console.info("[persistentStore.ts/migrations/0.6.3] run migration");

      store.set(
        "savesFolder",
        FileSystem.normalizeUpath(store.store.savesFolder)
      );
    },
    "0.6.29": (store) => {
      console.info("[persistentStore.ts/migrations/0.6.29] run migration");

      store.set("savesFolder", FileSystem.normalizeUpath(DEFAULT_STORES_PATH));
    },
  },
});

export default persistentStore;
