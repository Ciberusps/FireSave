import ElectronStore from "electron-store";

import persistentStore from "./persistent";

import { APP_VERSION } from "../utils/config";

const cacheStore = new ElectronStore<TGamesStore>({
  // TODO: wait for pr https://github.com/sindresorhus/electron-store/pull/225
  // @ts-ignore
  projectVersion: APP_VERSION,
  cwd: persistentStore.store.gamesStorePath,
  name: "games",
  defaults: {
    games: {},
    savePoints: {},
  },
  migrations: {
    "1.0.0": (settings) => {
      console.log("MIGRATION RUNNED");
    },
  },
});

export default cacheStore;
