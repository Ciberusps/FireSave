import Games from "../utils/games";
import Stores from "../stores";

type TGamesHandlers = {
  createCustomGame: IPC.THandler<"createCustomGame">;
  removeGame: IPC.THandler<"removeGame">;
  editGame: IPC.THandler<"editGame">;
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
};

export default GamesHandlers;
export { TGamesHandlers };
