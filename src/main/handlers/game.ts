import { shell } from "electron";
import child from "child_process";

import Games from "../utils/games";
import Stores from "../stores";
import { getCustomGameExePath } from "../utils";

type TGamesHandlers = {
  createCustomGame: IPC.THandler<"createCustomGame">;
  removeGame: IPC.THandler<"removeGame">;
  editGame: IPC.THandler<"editGame">;
  runGame: IPC.THandler<"runGame">;
};

const GamesHandlers: TGamesHandlers = {
  createCustomGame: async (_, payload) => {
    Games.createCustomGame(payload);
  },
  editGame: async (_, gameId, payload) => {
    try {
      const game = Stores.Games.store.games[gameId];
      if (!game) throw new Error("Game not found");
      const newGame = { ...game, ...payload };

      const autoDetectedGames = await Games.autoDetectGames();
      const validatedGame = await Games.validateGame(
        newGame,
        autoDetectedGames
      );

      if (!validatedGame.isGamePathValid) {
        throw new Error("Game path not valid");
      }
      if (!validatedGame.isSaveConfigValid) {
        throw new Error("Saves config not valid");
      }
      Stores.Games.set(`games.${gameId}`, validatedGame);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
  removeGame: async (_, id) => {
    // @ts-ignore
    Stores.Games.delete(`games.${id}`);
    return true;
  },
  runGame: async (_, id) => {
    try {
      const game = Stores.Games.store.games?.[id];
      if (!game) {
        throw new Error("Game not found");
      }

      if (game.detectionType === "steam") {
        shell.openExternal("steam://rungameid/" + game.steamAppId);
      } else if (game.detectionType === "manual") {
        const exePath = getCustomGameExePath(game?.gamePath);
        if (exePath) {
          child.execFile(exePath);
        } else {
          throw new Error("Game executable path not valid");
        }
      }
    } catch (err) {
      // TODO: toaster error
      console.error(err);
    }

    [1000, 3000, 5000, 10000].forEach((ms) => {
      setTimeout(() => {
        Games.updateRunningGames();
      }, ms);
    });
  },
};

export default GamesHandlers;
export { TGamesHandlers };
