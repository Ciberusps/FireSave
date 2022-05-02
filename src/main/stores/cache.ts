import ElectronStore from "electron-store";

import persistentStore from "./persistent";

const cacheStore = new ElectronStore<TGamesStore>({
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
