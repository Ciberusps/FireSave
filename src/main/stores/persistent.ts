import ElectronStore from "electron-store";
import FileSystem from "../utils/fileSystem";

import { DEFAULT_STORES_PATH } from "../utils/config";

// persistent store in `%AppData%/FireSave/config.json` exists even after app uninstall
const persistentStore = new ElectronStore<TPersistentStore>({
  defaults: {
    settingsStorePath: undefined,
    gamesStorePath: undefined,
    savesFolder: DEFAULT_STORES_PATH,
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
  },
});

export default persistentStore;
