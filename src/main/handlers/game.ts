import Stores from "../stores";
import ipcMain from "../utils/ipcMain";

// import Games from "../utils/games";

// ipcMain.handle("createGame", async (_, { gamePath, saveFilesOrFolder }) => {
//   return Games.create({ gamePath, saveFilesOrFolder });
// });

ipcMain.handle("editGame", async (_, { game, exePath, saves }) => {
  game.gamePath = exePath;
  game.saveFilesOrFolder = saves;
  Stores.Settings.set(`games.${game.id}`, game);
  return true;
});

ipcMain.handle("removeGame", async (_, id) => {
  // @ts-ignore
  Stores.Settings.delete(`games.${id}`);
  return true;
});
