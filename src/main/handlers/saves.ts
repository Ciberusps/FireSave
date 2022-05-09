import SteamworksSDK from "../utils/steamworksSDK";

import Saves from "../utils/saves";
import Stores from "../stores";

type TSavesHandlers = {
  saveGame: IPC.THandler<"saveGame">;
  loadSavePoint: IPC.THandler<"loadSavePoint">;
  removeSavePoint: IPC.THandler<"removeSavePoint">;
  getQuota: IPC.THandler<"getQuota">;
};

const SavesHandlers: TSavesHandlers = {
  saveGame: async (_, gameId) => {
    // TODO: dont create screenshot if game not runned
    Saves.save(Stores.Games.store.games[gameId], "manual");
  },
  loadSavePoint: async (_, gameId, savePointId) => {
    return Saves.load(gameId, savePointId);
  },
  removeSavePoint: async (_, gameId, savePointId) => {
    Saves.remove(gameId, savePointId);
  },
  getQuota: async () => {
    const cloudQuota = await SteamworksSDK.getCloudQuota();
    const test = {
      totalMB: cloudQuota.totalBytes / 1000 / 1000,
      availableMB: cloudQuota.availableBytes / 1000 / 1000,
      t: 3234,
    };
    return test;
  },
};

export default SavesHandlers;
export { TSavesHandlers };
