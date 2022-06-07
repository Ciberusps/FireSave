import ElectronStore from "electron-store";

import persistentStore from "./persistent";
import { PLATFORM } from "../utils/config";
import { joinAndNormalize } from "../utils";

const gamesStore = new ElectronStore<TGamesStore>({
  cwd: persistentStore.store.gamesStorePath,
  name: "games",
  defaults: {
    games: {},
    savePoints: {},
  },
  migrations: {
    "1.0.0": () => {
      console.log("MIGRATION RUNNED");
    },
    "0.3.23": (store) => {
      const games = store.store.games;
      Object.entries(games).forEach(([, game]) => {
        const savesConfig = game.savesConfig?.[PLATFORM];
        if (savesConfig && !savesConfig?.type) {
          savesConfig.type = "simple";
        }
      });
      store.set("games", games);
    },
    "0.5.2": (store) => {
      const games = store.store.games;
      Object.entries(games).forEach(([, game]) => {
        const gamePath = game.gamePath?.[PLATFORM];
        if (gamePath?.path) {
          gamePath.path = joinAndNormalize(gamePath.path);
        }
      });
      store.set("games", games);
    },
  },
});

export default gamesStore;
