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
    try {
      Saves.makeSavePoint(gameId, "manual");
      return { success: true, message: "Save point created" };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: "Load failed " + (err as any)?.message,
      };
    }
  },
  loadSavePoint: async (_, gameId, savePointId) => {
    try {
      Saves.loadSavePoint(gameId, savePointId);
      return { success: true, message: "Saved backup and Loaded" };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: "Load failed " + (err as any)?.message,
      };
    }
  },
  removeSavePoint: async (_, gameId, savePointId) => {
    try {
      Saves.removeSavePoint(gameId, savePointId);
      return { success: true, message: "Save point removed" };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
  getQuota: async () => {
    try {
      const cloudQuota = await SteamworksSDK.getCloudQuota();
      return {
        success: true,
        result: {
          totalMB: cloudQuota.totalBytes / 1000 / 1000,
          availableMB: cloudQuota.availableBytes / 1000 / 1000,
        },
      };
    } catch (err) {
      console.log(err);
      return { success: false, message: (err as any)?.message };
    }
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
      console.error(err);
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

      return { success: true, message: "Save point name changed" };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
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
      return { success: true, message: "Save point added to favorites" };
    } catch (err) {
      console.error(err);
      return { success: false, message: (err as any)?.message };
    }
  },
};

export default SavesHandlers;
export { TSavesHandlers };
