import SteamworksSDK from "../utils/steamworksSDK";

import Saves from "../utils/saves";

type TSavesHandlers = {
  makeSavePoint: IPC.THandler<"makeSavePoint">;
  loadSavePoint: IPC.THandler<"loadSavePoint">;
  removeSavePoint: IPC.THandler<"removeSavePoint">;
  getQuota: IPC.THandler<"getQuota">;
};

const SavesHandlers: TSavesHandlers = {
  makeSavePoint: async (_, gameId) => {
    // TODO: dont create screenshot if game not runned
    Saves.makeSavePoint(gameId, "manual");
  },
  loadSavePoint: async (_, gameId, savePointId) => {
    return Saves.loadSavePoint(gameId, savePointId);
  },
  removeSavePoint: async (_, gameId, savePointId) => {
    Saves.removeSavePoint(gameId, savePointId);
  },
  getQuota: async () => {
    const cloudQuota = await SteamworksSDK.getCloudQuota();
    return {
      totalMB: cloudQuota.totalBytes / 1000 / 1000,
      availableMB: cloudQuota.availableBytes / 1000 / 1000,
    };
  },
};

export default SavesHandlers;
export { TSavesHandlers };
