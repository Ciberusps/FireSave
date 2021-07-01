import { ipcMain } from "electron";

import Saves from "../utils/saves";
import Store from "../utils/store";

ipcMain.handle("saveGame", async (_, gameId) => {
  // TODO: dont create screenshot if game not runned
  Saves.save(Store.store.games[gameId], "manualsave");
});

ipcMain.handle("loadSavePoint", (_, gameId: string, savePointId: string) => {
  return Saves.load(gameId, savePointId);
});

ipcMain.handle("removeSavePoint", async (_, gameId: string, savePointId: string) => {
  Saves.remove(gameId, savePointId);
});
