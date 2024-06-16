import ElectronStore from "electron-store";
import makeSynchronous from "make-synchronous";

import persistentStore from "./persistent";
import FileSystem from "../utils/fileSystem";
import { PLATFORM } from "../utils/config";
import { findSteam, ISteamApp } from "@ciberus/find-steam-app";

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
    steamGamesStoreInfo: {},
    savePoints: {},
    tags: DEFAULT_TAGS_LIST,
  },
  beforeEachMigration: (_, context) => {
    console.info(
      `[games-store] run migration from ${context.fromVersion} to ${
        context.toVersion
      } migrations to run ${context.versions.toString()}`
    );
  },
  migrations: {
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
    "0.7.0": (store) => {
      let games = store.store.games;

      Object.entries(games).forEach(([, game]) => {
        // @ts-ignore
        if (game?.steam?.storeInfo) {
          store.set(
            `steamGamesStoreInfo.${game.steamAppId}`,
            // @ts-ignore
            game.steam.storeInfo
          );
        }

        // @ts-ignore
        if (!game.steamAppId && game?.steam?.appId) {
          // @ts-ignore
          game.steamAppId = game.steam.appId;
        }
        const savePoints = store.store.savePoints?.[game.id];
        if (savePoints && Object.values(savePoints)?.length >= 1) {
          game.isSettupedAtLeastOnce = true;
        }

        // @ts-ignore
        delete game.steam;
        // @ts-ignore
        delete game.isCreatedAutomatically;

        if (game.steamAppId) {
          // @ts-ignore
          game.detectionType = "steam";
        } else {
          // @ts-ignore
          game.detectionType = "manual";
        }
      });

      store.set("games", games);
    },
    "0.7.1": (store) => {
      let games = store.store.games;

      Object.entries(games).forEach(([, game]) => {
        // @ts-ignore
        if (game.detectionType === "steam") {
          game.isAutoDetectionEnabled = true;
        } else {
          game.isAutoDetectionEnabled = false;
        }
        // @ts-ignore
        if (game?.detectionType) {
          game.autoDetectionMethod =
            // @ts-ignore
            game.detectionType !== "manual" ? game.detectionType : undefined;
          // @ts-ignore
          delete game?.detectionType;
        }
      });

      store.set("games", games);
    },
    "0.8.0": (store) => {
      let games = store.store.games;

      const steamInfo = makeSynchronous(findSteam)();
      const steamApps: ISteamApp[] = [];
      for (const lib of steamInfo.libraries) {
        for (const steamApp of lib.apps) {
          steamApps.push(steamApp);
        }
      }

      console.log("KDSFLKD", steamApps.length, steamApps);

      Object.entries(games).forEach(async ([, game]) => {
        if (
          game.isAutoDetectionEnabled &&
          game.autoDetectionMethod === "steam"
        ) {
          console.log("KDSFLKD 1 ", game.id, game.name);
          const steamAppInfo = steamApps.find(
            (s) => s.appId === game.steamAppId
          );
          const newSavePointsFolderName = steamAppInfo?.manifest.installdir;
          console.log(
            "KDSFLKD 2 ",
            game.id,
            game.name,
            newSavePointsFolderName
          );

          if (newSavePointsFolderName) {
            const savesFolderPath = FileSystem.joinUpath(
              persistentStore.store.savesFolder,
              `${game.savePointsFolderName}__${game.id}`
            );
            const newSavesFolderPath = FileSystem.joinUpath(
              persistentStore.store.savesFolder,
              `${newSavePointsFolderName}__${game.id}`
            );

            game.savePointsFolderName = newSavePointsFolderName;

            try {
              FileSystem.renameFolder(savesFolderPath, newSavesFolderPath);
            } catch (err) {}
          }
        }
      });

      console.log("New GAMES EPTA", games);
      gamesStore.set("games", games);
    },
  },
});

export default gamesStore;
