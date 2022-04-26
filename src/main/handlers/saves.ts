import ipcMain from "../utils/ipcMain";
import Saves from "../utils/saves";
import Stores from "../utils/stores";

ipcMain.handle<IPC.TSaveGame>("saveGame", async (_, gameId) => {
  // TODO: dont create screenshot if game not runned
  Saves.save(Stores.Settings.store.games[gameId], "manualsave");
});

ipcMain.handle<IPC.TLoadSavePoint>(
  "loadSavePoint",
  async (_, gameId, savePointId) => {
    return Saves.load(gameId, savePointId);
  }
);

ipcMain.handle<IPC.TRemoveSavePoint>(
  "removeSavePoint",
  async (_, gameId, savePointId) => {
    Saves.remove(gameId, savePointId);
  }
);
