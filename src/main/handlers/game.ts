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
    console.log("TRY SAVE");
    const game = Stores.Games.store.games[gameId];
    if (!game) return false;
    Stores.Games.set(`games.${gameId}`, {
      ...game,
      ...payload,
      // isValid
    });
    console.log("GAME SAVED");
    return true;
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

      if (game.steam?.appId) {
        shell.openExternal("steam://rungameid/" + game.steam.appId);
      } else if (!game.isCreatedAutomatically) {
        const exePath = getCustomGameExePath(game?.gamePath);
        if (exePath) {
          child.execFile(exePath);
        } else {
          throw new Error("Game executable path not valid");
        }
      }
    } catch (err) {
      // TODO: toaster error
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
