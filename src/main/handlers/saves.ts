import SteamworksSDK from "../utils/steamworksSDK";

import Saves from "../utils/saves";

type TSavesHandlers = {
  makeSave: IPC.THandler<"makeSave">;
  loadSave: IPC.THandler<"loadSave">;
  removeSave: IPC.THandler<"removeSave">;
  getQuota: IPC.THandler<"getQuota">;
};

const SavesHandlers: TSavesHandlers = {
  makeSave: async (_, gameId) => {
    // TODO: dont create screenshot if game not runned
    Saves.makeSave(gameId, "manual");
  },
  loadSave: async (_, gameId, savePointId) => {
    return Saves.loadSave(gameId, savePointId);
  },
  removeSave: async (_, gameId, savePointId) => {
    Saves.removeSave(gameId, savePointId);
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
