import ElectronStore from "electron-store";

import { DEFAULT_STORES_PATH } from "../utils/config";

// persistent store in app folder config.json
const persistentStore = new ElectronStore<TPersistentStore>({
  defaults: {
    // TODO: probably paths to store not needed, better to have path on "saves"(FireSave_Data) folder
    // TODO: paths should be platform specific like win32/linux/darwin
    settingsStorePath: DEFAULT_STORES_PATH,
    gamesStorePath: DEFAULT_STORES_PATH,
  },
});

export default persistentStore;
