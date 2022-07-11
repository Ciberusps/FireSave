import SteamworksSDK from "../utils/steamworksSDK";

import Saves from "../utils/saves";
import Stores from "../stores";

type TSavesHandlers = {
  makeSavePoint: IPC.THandler<"makeSavePoint">;
  loadSavePoint: IPC.THandler<"loadSavePoint">;
  removeSavePoint: IPC.THandler<"removeSavePoint">;
  getQuota: IPC.THandler<"getQuota">;
  changeSavePointTags: IPC.THandler<"changeSavePointTags">;
  changeSavePointName: IPC.THandler<"changeSavePointName">;
  addToFavorite: IPC.THandler<"addToFavorite">;
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
  changeSavePointTags: async (_, gameId, savePointId, newTags) => {
    try {
      const allTags = Stores.Games.store.tags;
      const savePoint = Stores.Games.store.savePoints?.[gameId]?.[savePointId];
      if (!savePoint) throw new Error("Save point not found");

      const tagsToAdd = newTags.filter((t) => !savePoint.tags.includes(t));
      const tagsToRemove = savePoint.tags.filter((t) => !newTags.includes(t));

      if (tagsToAdd.length > 0 || tagsToRemove.length > 0) {
        tagsToAdd.forEach((tag) => {
          if (!allTags.includes(tag)) {
            allTags.push(tag);
          }
          if (!savePoint.tags.includes(tag)) {
            savePoint.tags.push(tag);
          }
        });
        tagsToRemove.forEach((tag) => {
          savePoint.tags = savePoint.tags.filter((t) => t !== tag);
        });

        Stores.Games.set("tags", allTags);
        Stores.Games.set(`savePoints.${gameId}.${savePointId}`, savePoint);
      }
    } catch (err) {
      // TODO: toaster error
      console.log(err);
    }
  },
  changeSavePointName: async (_, gameId, savePointId, newName) => {
    try {
      const savePoint = Stores.Games.store.savePoints?.[gameId]?.[savePointId];
      if (!savePoint) throw new Error("Save point not found");
      if (typeof newName !== "string") {
        throw new Error("New save point name not valid");
      }

      Stores.Games.set(`savePoints.${gameId}.${savePointId}.name`, newName);
      // TODO: toaster success
    } catch (err) {
      // TODO: toaster error
      console.log(err);
    }
  },
  addToFavorite: async (_, gameId, savePointId) => {
    try {
      const savePoint = Stores.Games.store.savePoints?.[gameId]?.[savePointId];
      if (!savePoint) throw new Error("Save point not found");

      Stores.Games.set(
        `savePoints.${gameId}.${savePointId}.isFavorite`,
        savePoint.isFavorite ? false : true
      );
    } catch (err) {
      // TODO: toaster error
      console.log(err);
    }
  },
};

export default SavesHandlers;
export { TSavesHandlers };
