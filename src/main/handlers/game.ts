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
  editGame: async (_, { game, exePath, saves }) => {
    game.gamePath = exePath;
    game.saveFilesOrFolder = saves;
    Stores.Settings.set(`games.${game.id}`, game);
    return true;
  },
  removeGame: async (_, id) => {
    // @ts-ignore
    Stores.Settings.delete(`games.${id}`);
    return true;
  },
};

export default GamesHandlers;
export { TGamesHandlers };
