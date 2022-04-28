import ElectronStore from "electron-store";

import { APP_VERSION, DEFAULT_STORES_PATH } from "../utils/config";

// persistent store in app folder config.json
const persistentStore = new ElectronStore<TPersistentStore>({
  // TODO: wait for pr https://github.com/sindresorhus/electron-store/pull/225
  // @ts-ignore
  projectVersion: APP_VERSION,
  defaults: {
    // TODO: probably paths to store not needed, better to have path on "saves"(FireSave_Data) folder
    // TODO: paths should be platform specific like win32/linux/darwin
    settingsStorePath: DEFAULT_STORES_PATH,
    gamesStorePath: DEFAULT_STORES_PATH,
  },
});

export default persistentStore;
