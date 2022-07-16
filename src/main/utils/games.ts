// TODO: games utils duplicate functionality of handlers/game.ts
// move functions to handlers/game.ts required where possible
import { findSteam, ISteamApp } from "@ciberus/find-steam-app";
import { nanoid } from "nanoid";

import SteamAPI from "./steamAPI";
import Processes from "./processes";

import Stores from "../stores";
import FileSystem from "../utils/fileSystem";
import { PLATFORM } from "./config";
import { getGamePathOnly } from ".";

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

const gamesToShortList = (games: TGame[]): string[] => {
  return games.map((g) => `name "${g.name}" | id "${g.id}"`);
};

const convertSteamAppToGame = (
  steamApp: ISteamApp,
  // TODO: remove this paramter?
  storeInfo?: TSteamAppStoreInfo
): TGame | undefined => {
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
    isAutoDetectionEnabled: true,
    autoDetectionMethod: "steam",
    isValid: false,
    isGamePathValid: false,
    isSaveConfigValid: false,
    isSettupedAtLeastOnce: false,
    isPlaingNow: false,
    // name but probably installDir better, mb for steamgames prefix "steam__" can be done or for others "nonsteam__"
    savePointsFolderName: steamApp.manifest.name,
    savesStats: { total: 0, auto: 0, manual: 0 },
    imageUrl: storeInfo?.header_image,
    gamePath: {
      [PLATFORM]: { path: FileSystem.normalizeUpath(steamApp.path) },
    },
    steamAppId: steamApp.appId,
  };

  return newGame;
};

const autoDetectSteamGames = async (): Promise<TGame[]> => {
  console.info("[games.ts/autoDetectSteamGames()] Try auto-detect steam games");
  const result: TGame[] = [];
  try {
    const steamInfo = await findSteam();
    if (!steamInfo?.libraries) {
      throw new Error(
        `[games.ts/autoDetectSteamGames()] No steam "libraries" found`
      );
    }

    for (const lib of steamInfo.libraries) {
      for (const steamApp of lib.apps) {
        const autoDetectedSteamGame = convertSteamAppToGame(steamApp);
        if (autoDetectedSteamGame) {
          result.push(autoDetectedSteamGame);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  console.log(
    "[games.ts/autoDetectSteamGames()] Auto-detected steam games",
    gamesToShortList(result)
  );
  return result;
};

type TAutoDetectedGames = {
  all: TGame[];
  steam: TGame[];
  custom: TGame[];
};

const autoDetectGames = async (): Promise<TAutoDetectedGames> => {
  let result: TAutoDetectedGames = {
    all: [],
    steam: [],
    custom: [],
  };
  try {
    const steamGames = await autoDetectSteamGames();
    result.all = [...steamGames];
    result.steam = steamGames;
  } catch (err) {
    console.error(err);
  }

  return result;
};

const validateSteamGamePath = (
  game: TGame,
  autoDetectedSteamGame: TGame | undefined
): boolean => {
  let result = false;
  if (!autoDetectedSteamGame) return result;

  const gamePath = getGamePathOnly(game);
  const steamGamePath = getGamePathOnly(game);

  if (
    game.isAutoDetectionEnabled &&
    game.autoDetectionMethod === "steam" &&
    gamePath &&
    steamGamePath &&
    FileSystem.isPathsEqual(steamGamePath, gamePath)
  ) {
    result = true;
  }

  return result;
};

const validateCustomGamePath = async (game: TGame): Promise<boolean> => {
  let result = false;

  // TOOD: check exe file also? getCustomGamePath()?
  const gamePath = getGamePathOnly(game);
  if (!gamePath || gamePath.length <= 1) return result;

  result = await FileSystem.isPathExist(gamePath);

  return result;
};

const validateSaveConfig = async (game: TGame): Promise<boolean> => {
  let result = false;

  const savesFolderPath = game.savesConfig?.[PLATFORM]?.saveFolder?.path;
  if (!savesFolderPath || savesFolderPath?.length <= 1) return result;

  result = await FileSystem.isPathExist(savesFolderPath);
  return result;
};

const validateGame = async (
  game: TGame,
  autoDetectedGames: TAutoDetectedGames | undefined
): Promise<TGame> => {
  const steamAppId = game.steamAppId;

  game.isValid = false;
  game.isGamePathValid = false;
  game.isSaveConfigValid = false;

  if (game.isAutoDetectionEnabled && game.autoDetectionMethod === "steam") {
    const autoDetectedSteamGame = autoDetectedGames?.steam.find(
      (g) => g.steamAppId === steamAppId
    );
    game.isGamePathValid = validateSteamGamePath(game, autoDetectedSteamGame);
    game.isSaveConfigValid = await validateSaveConfig(game);
  }

  if (!game.isAutoDetectionEnabled) {
    game.isGamePathValid = await validateCustomGamePath(game);
    game.isSaveConfigValid = await validateSaveConfig(game);
  }

  game.isValid = game.isGamePathValid && game.isSaveConfigValid;

  console.info(
    `[games.ts/validateGame()] Game "${game.name}"(id: "${game.id}") is valid? ${game.isValid}`
  );

  return game;
};

const validateGames = async (
  games: TGame[],
  autoDetectedGames: TAutoDetectedGames
): Promise<TGame[]> => {
  const validateGamesPromises = games.map((game) =>
    validateGame(game, autoDetectedGames)
  );
  const validatedGames = await Promise.all(validateGamesPromises);

  for (const game of validatedGames) {
    // if steam game.gamePath not valid, update from autoDetected games
    if (game.isAutoDetectionEnabled && game.autoDetectionMethod === "steam") {
      const autoDetectedSteamGame = autoDetectedGames.steam.find(
        (g) => g.steamAppId === game.steamAppId
      );
      if (autoDetectedSteamGame) {
        const newGamePath = autoDetectedSteamGame.gamePath?.[PLATFORM];
        if (newGamePath) {
          game.isGamePathValid = true;
          game.gamePath = {
            ...game.gamePath,
            [PLATFORM]: newGamePath,
          };
        }
      }
    }
  }
  return validatedGames;
};

const fetchSteamGamesStoreInfo = async (autoDetectedSteamGames: TGame[]) => {
  const steamStoreInfoAppIds = Object.keys(
    Stores.Games.store.steamGamesStoreInfo
  );
  const steamStoreInfoAppIdsToFetch: number[] = [];

  for (const game of autoDetectedSteamGames) {
    if (
      game.steamAppId &&
      !steamStoreInfoAppIds.includes(game.steamAppId.toString())
    ) {
      steamStoreInfoAppIdsToFetch.push(game.steamAppId);
    }
  }
  const gamesStoreInfo = await SteamAPI.fetchGamesStoreInfo(
    steamStoreInfoAppIdsToFetch
  );
  if (!gamesStoreInfo) return;

  Object.entries(gamesStoreInfo.result).forEach(
    ([steamAppId, steamStoreInfo]) => {
      Stores.Games.set(`steamGamesStoreInfo.${steamAppId}`, steamStoreInfo);
    }
  );
};

const verifyGames = async () => {
  try {
    let games = Stores.Games.store.games;

    const settupedGames = Object.values(games).filter(
      (game) => !game.isSettupedAtLeastOnce
    );
    for (const game of settupedGames) {
      delete games[game.id];
    }

    const autoDetectedGames = await autoDetectGames();

    const gamesList = Object.values(Stores.Games.store.games) || [];
    const settupedGamesPaths = gamesList
      .filter((g) => g.isSettupedAtLeastOnce)
      .map((game) => getGamePathOnly(game));
    const installedGamesMap: { [gameId: string]: TGame } = {};
    autoDetectedGames.all
      .filter((g) => {
        return !settupedGamesPaths.includes(getGamePathOnly(g));
      })
      .forEach((game) => {
        installedGamesMap[game.id] = game;
      });

    games = { ...games, ...installedGamesMap };
    Stores.Games.set("games", games);

    try {
      const validatedGames = await validateGames(
        Object.values(games),
        autoDetectedGames
      );
      for (const game of validatedGames) {
        Stores.Games.set(`games.${game.id}`, game);
      }
    } catch (err) {
      console.error(`[games.ts/verifyGames] Error validating games: `);
      console.error(err);
    }

    await fetchSteamGamesStoreInfo(autoDetectedGames.steam);
  } catch (err) {
    console.error(err);
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
  autoDetectGames,
  verifyGames,
  validateGame,
  updateRunningGames,
  generateUniqGameId,
  // TODO:
  // getValidAndRunningGames
};

export default Games;
