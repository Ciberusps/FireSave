// TODO: games utils duplicate functionality of handlers/game.ts
// move functions to handlers/game.ts required where possible
import { findSteam, ISteamApp } from "@ciberus/find-steam-app";
import { nanoid } from "nanoid";

import SteamAPI from "./steamAPI";
import Processes from "./processes";

import Stores from "../stores";
import FileSystem from "../utils/fileSystem";
import { PLATFORM } from "./config";

const generateUniqGameId = (limit = 10): string | null => {
  let result = null;
  for (let i = 0; i < limit; i++) {
    result = nanoid();
    if (!Stores.Games.has(`games.${result}`)) {
      break;
    }
  }
  if (!result) {
    // TODO:
    console.error("Cant generate game id");
  }
  return result;
};

const createSteamGame = async (
  steamApp: ISteamApp,
  storeInfo?: TSteamAppStoreInfo
): Promise<void> => {
  // probably check that game not exist, dont know how to do it
  const id = generateUniqGameId();
  if (!id) {
    // TODO: error handling
    // ipcMain.emit("error", "Cant generate game id");
    return;
  }

  const name = steamApp.manifest.name || "Unknown";

  const newGame: TGame = {
    id,
    name,
    isValid: false,
    isPlaingNow: false,
    isCreatedAutomatically: true,
    // name but probably installDir better, mb for steamgames prefix "steam__" can be done or for others "nonsteam__"
    savePointsFolderName: steamApp.manifest.name,
    savesStats: { total: 0, auto: 0, manual: 0 },
    imageUrl: storeInfo?.header_image,
    gamePath: {
      [PLATFORM]: { path: FileSystem.normalizeUpath(steamApp.path) },
    },
    steam: {
      appId: steamApp.appId,
      storeInfo,
    },
  };

  Stores.Games.set(`games.${id}`, newGame);
};

const fillSteamGames = async () => {
  try {
    const games = Stores.Games.get("games");
    const steamInfo = await findSteam();
    if (!steamInfo?.libraries) return;

    const gamesToUpdate: { game: TGame; steamApp: ISteamApp }[] = [];
    const gamesToCreate: ISteamApp[] = [];

    for (const lib of steamInfo.libraries) {
      for (const app of lib.apps) {
        const game = Object.values(games).find(
          (g) => g.steam?.appId === app.appId
        );

        if (game) {
          Stores.Games.set(
            `games.${game.id}.gamePath.${PLATFORM}.path`,
            FileSystem.normalizeUpath(app.path)
          );
          if (!game.steam?.storeInfo || !game.imageUrl) {
            // TODO: report why game is not valid
            gamesToUpdate.push({ game, steamApp: app });
          }
        } else {
          gamesToCreate.push(app);
        }
      }
    }

    if (Boolean(gamesToCreate.length) || Boolean(gamesToUpdate.length)) {
      const appIds = [
        ...gamesToCreate.map((g) => g.appId),
        ...gamesToUpdate.map((g) => g.steamApp.appId),
      ];
      const gamesStoreInfo = await SteamAPI.fetchGamesStoreInfo(appIds);
      if (!gamesStoreInfo) return;

      for (const game of gamesToUpdate) {
        if (game.game.steam?.appId) {
          const storeInfo = gamesStoreInfo.result?.[game.game.steam?.appId];
          if (storeInfo) {
            Stores.Games.set(
              `games.${game.game.id}.steam.storeInfo`,
              storeInfo
            );
            Stores.Games.set(
              `games.${game.game.id}.imageUrl`,
              storeInfo.header_image
            );
          }
        }
      }

      for (const steamApp of gamesToCreate) {
        const storeInfo = gamesStoreInfo.result?.[steamApp.appId];
        if (storeInfo) {
          createSteamGame(steamApp, storeInfo);
        } else {
          // TODO: report why cant create game
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const createCustomGame = async (
  payload: IPC.TCreateCustomGamePayload
): Promise<void> => {
  try {
    // probably check that game not exist, dont know how to do it
    const id = generateUniqGameId();
    if (!id) {
      throw new Error("Cant generate game id");
    }

    const name = payload.gamePath.files?.[0] || "Unknown";

    const newGame: TGame = {
      id,
      name,
      isValid: true,
      isPlaingNow: false,
      isCreatedAutomatically: false,
      // name but probably installDir better, mb for steamgames prefix "steam__" can be done or for others "nonsteam__"
      savePointsFolderName: name.replace(".exe", ""),
      savesStats: { total: 0, auto: 0, manual: 0 },
      imageUrl: undefined,
      gamePath: { [PLATFORM]: payload.gamePath },
    };
    Stores.Games.set(`games.${id}`, newGame);
    console.info(
      `[games.ts/createCustomGame] new game created: ${JSON.stringify(newGame)}`
    );
    // TODO: toaster game created
  } catch (err) {
    console.error(err);
    // TODO: error handling
  }
};

const updateRunningGames = async () => {
  const gamesList = Object.values(Stores.Games.store.games);
  const processes = await Processes.getProcessesList();

  for (const game of gamesList) {
    const isRunning = processes.find((p) => {
      if (PLATFORM && game.gamePath?.[PLATFORM]?.path) {
        return p.path?.startsWith(game.gamePath[PLATFORM]!.path);
      }
      return false;
    });

    if (isRunning) {
      console.info(
        `[games.ts/updateRunningGames] game is running: ${game.name}`
      );
      Stores.Games.set(`games.${game.id}.isPlaingNow`, true);
    } else {
      Stores.Games.set(`games.${game.id}.isPlaingNow`, false);
    }
  }
};

const Games = {
  // create,
  createCustomGame,
  fillSteamGames,
  updateRunningGames,
  // TODO:
  // getValidAndRunningGames
};

export default Games;
