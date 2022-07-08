import ElectronStore from "electron-store";

import persistentStore from "./persistent";
import FileSystem from "../utils/fileSystem";
import { PLATFORM } from "../utils/config";

const DEFAULT_TAGS_LIST = [
  "auto",
  "manual",
  "boss",
  "quest",
  "story",
  "tutorial",
  "lore",
  "cutscene",
  "other",
];

const gamesStore = new ElectronStore<TGamesStore>({
  cwd: persistentStore.store.savesFolder,
  name: "games",
  defaults: {
    games: {},
    savePoints: {},
    tags: DEFAULT_TAGS_LIST,
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
          gamePath.path = FileSystem.normalizeUpath(gamePath.path);
        }
      });
      store.set("games", games);
    },
    "0.6.2": (store) => {
      const games = store.store.games;
      Object.entries(games).forEach(([, game]) => {
        const gamePath = game.gamePath?.[PLATFORM];
        if (gamePath?.path) {
          gamePath.path = FileSystem.normalizeUpath(gamePath.path);
        }
      });
      store.set("games", games);
    },
  },
});

export default gamesStore;
