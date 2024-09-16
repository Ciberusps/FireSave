import { shell } from "electron";
import child from "child_process";

import Games from "../utils/games";
import Stores from "../stores";
import { getCustomGameExePath } from "../utils";
import { PLATFORM } from "../utils/config";

const throwErrorIfGameNotValid = (game: TGame) => {
  if (!game.isGamePathValid) {
    throw new Error("Game path not valid, please check if it exists");
  }
  if (!game.isSaveConfigValid) {
    throw new Error(
      "Saves config not valid, please check that you choosed right folder"
    );
  }
  if (!game.isValid) {
    throw new Error("Game not valid");
  }
};

type TGamesHandlers = {
  createCustomGame: IPC.THandler<"createCustomGame">;
  removeGame: IPC.THandler<"removeGame">;
  editGame: IPC.THandler<"editGame">;
  runGame: IPC.THandler<"runGame">;
};

const GamesHandlers: TGamesHandlers = {
  createCustomGame: async (_, payload) => {
    try {
      const id = Games.generateUniqGameId();
      if (!id) {
        throw new Error("Cant generate game id");
      }

      const name = payload.gamePath.files?.[0] || "Unknown";
      const savePointsFolderName = name.replace(".exe", "");

      const newGame: TGame = {
        id,
        name,
        isAutoDetectionEnabled: false,
        autoDetectionMethod: undefined,
        isValid: false,
        isGamePathValid: false,
        isSaveConfigValid: false,
        isSettupedAtLeastOnce: true,
        isPlaingNow: false,
        savePointsFolderName,
        savesStats: { total: 0, auto: 0, manual: 0 },
        imageUrl: undefined,
        gamePath: { [PLATFORM]: payload.gamePath },
        savesConfig: { [PLATFORM]: payload.savesConfig },
      };

      const validatedGame = await Games.validateGame(newGame, undefined);

      // TODO: probably check that game not exist already, dont know how to do it
      throwErrorIfGameNotValid(validatedGame);

      Stores.Games.set(`games.${id}`, newGame);
      console.info(
        `[games.ts/createCustomGame()] new game created: ${JSON.stringify(
          newGame
        )}`
      );
      return { success: true, message: "Game created" };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
  editGame: async (_, gameId, payload) => {
    try {
      const game = Stores.Games.store.games[gameId];
      if (!game) throw new Error("Game not found");
      const newGame: TGame = {
        ...game,
        isAutoDetectionEnabled: payload.isAutoDetectionEnabled,
        autoDetectionMethod: payload.autoDetectionMethod,
        gamePath: { ...game.gamePath, [PLATFORM]: payload.gamePath },
        savesConfig: { ...game.savesConfig, [PLATFORM]: payload.savesConfig },
      };
      console.log("NEW GAME", newGame);

      const autoDetectedGames = await Games.autoDetectGames();
      const validatedGame = await Games.validateGame(
        newGame,
        autoDetectedGames
      );

      console.log(
        `[games.ts/editGame()] validated game: ${JSON.stringify(validatedGame)}`
      );
      throwErrorIfGameNotValid(validatedGame);

      if (validatedGame.isValid) {
        validatedGame.isSettupedAtLeastOnce = true;
      }

      Stores.Games.set(`games.${gameId}`, validatedGame);
      return { success: true, message: "Game edited" };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
  removeGame: async (_, id) => {
    try {
      // @ts-ignore
      Stores.Games.delete(`games.${id}`);
      return { success: true, message: "Game removed" };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
  runGame: async (_, id) => {
    try {
      const game = Stores.Games.store.games?.[id];
      if (!game) {
        throw new Error("Game not found");
      }

      if (game.isAutoDetectionEnabled && game.autoDetectionMethod === "steam") {
        shell.openExternal("steam://rungameid/" + game.steamAppId);
      } else if (!game.isAutoDetectionEnabled) {
        const exePath = getCustomGameExePath(game?.gamePath);
        if (exePath) {
          child.execFile(exePath);
        } else {
          throw new Error("Game executable path not valid");
        }
      }

      [1000, 3000, 5000, 10000].forEach((ms) => {
        setTimeout(() => {
          console.log("[games.ts/runGame()] Games.updateRunningGames");
          Games.updateRunningGames().catch(console.error);
        }, ms);
      });

      return { success: true, message: "Game started" };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
};

export default GamesHandlers;
export { TGamesHandlers };
