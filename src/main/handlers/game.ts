import Stores from "../stores";

// import Games from "../utils/games";

type TGamesHandlers = {
  // createGame: IPC.THandler<"createGame">;
  removeGame: IPC.THandler<"removeGame">;
  editGame: IPC.THandler<"editGame">;
};

const GamesHandlers: TGamesHandlers = {
  // createGame: async (_, { gamePath, saveFilesOrFolder }) => {
  //   return Games.create({ gamePath, saveFilesOrFolder });
  // },
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
