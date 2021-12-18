import fs from "fs";
import path from "path";
import findProcess from "find-process";
import faker from "faker";
// screenshot-desktop dont work without asarUnpack
// @ts-ignore
import screenshot from "screenshot-desktop";
import { format } from "date-fns";

import Stores from "./stores";
import Analytics from "./analytics";
import FileSystem from "./fileSystem";
import { getId, getFileNameWithExtension } from ".";

const isGameRunning = async (game: TGame) => {
  try {
    const processName = getFileNameWithExtension(game.exePath);
    const list = await findProcess("name", processName);
    if (list?.length) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getSaveStoreFileName = (file: string): string => {
  if (file.includes(".")) {
    const res = file.split(".");
    res[0] = res[0] + "_" + format(new Date(), "____HH-mm-ss__dd_MM_yyyy");
    return res.join(".");
  } else {
    console.log("ERROR ");
    return "";
  }
};

const save = async (
  game: TGame,
  type: TSavePointType,
  options?: { isBeforeLoad: boolean }
) => {
  try {
    const gameStorePath = path.join(Stores.Persistent.store.settingsStorePath, game.name);

    if (game.saves.files.length === 1) {
      const file = game.saves.files[0];
      const savePath = path.join(game.saves.path, file);
      const saveStoreFileName = getSaveStoreFileName(file);
      const saveStorePath = path.join(gameStorePath, getSaveStoreFileName(file));

      if (!savePath) return;

      FileSystem.createDir(gameStorePath);

      fs.copyFileSync(savePath, saveStorePath);

      const savePointId = getId(saveStorePath);
      const savePointPathInStore = `games.${game.id}.savePoints.${savePointId}`;

      let typeNumber = 0;
      const statsPath = `games.${game.id}.stats`;
      const curStats = game.stats;
      Stores.Settings.set(`${statsPath}.allSavesCount`, curStats.allSavesCount + 1);
      if (type === "manualsave") {
        typeNumber = curStats.manualSaveCount + 1;
        Stores.Settings.set(`${statsPath}.manualSaveCount`, typeNumber);
      } else {
        typeNumber = curStats.autoSaveCount + 1;
        Stores.Settings.set(`${statsPath}.autoSaveCount`, typeNumber);
      }

      const savePoint: TSavePoint = {
        id: savePointId,
        name: faker.random.words(2),
        date: new Date().toISOString(),
        path: saveStorePath,
        type,
        number: curStats.allSavesCount,
        typeNumber,
        tags: [type],
      };

      Stores.Settings.set(savePointPathInStore, savePoint);

      const screenshotsPath = path.join(gameStorePath, "screenshots");
      FileSystem.createDir(screenshotsPath);
      const screenshotFilePath = path.join(
        screenshotsPath,
        saveStoreFileName.split(".")[0] + ".jpg"
      );

      let labels = [game.name, type];
      if (options?.isBeforeLoad) {
        labels.push("before_load");
      }

      Analytics.sendEvent({
        category: "savePoints",
        action: "saved",
        labels,
      });

      // console.log(screenshotFilePath);
      await screenshot({ filename: screenshotFilePath, format: "jpg" });
      Stores.Settings.set(savePointPathInStore + ".screenshot", screenshotFilePath);
    } else {
      throw new Error("Need support for many files");
    }
  } catch (err) {
    // TODO: send logs
    console.error(err);
  }
};

const load = async (gameId: string, savePointId: string) => {
  try {
    const game = Stores.Settings.store.games[gameId];
    const savePoint = game.savePoints?.[savePointId];
    if (!savePoint) throw new Error("SavePoint not found");

    await save(game, "manualsave", { isBeforeLoad: true });

    if (game.saves.files.length === 1) {
      const file = game.saves.files[0];
      const savePath = path.join(game.saves.path, file);

      fs.copyFileSync(savePoint.path, savePath);
      console.log("LOADED");
      Analytics.sendEvent({
        category: "savePoints",
        action: "loaded",
        labels: [game.name],
      });
    } else {
      throw new Error("Need support for many files");
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const remove = async (gameId: string, savePointId: string) => {
  try {
    const game = Stores.Settings.store.games[gameId];
    const savePoint = game.savePoints?.[savePointId];
    if (!savePoint) throw new Error("SavePoint not found");
    if (savePoint?.screenshot) FileSystem.removeFile(savePoint.screenshot);
    FileSystem.removeFile(savePoint.path);
    // @ts-ignore
    Stores.delete(`games.${gameId}.savePoints.${savePoint.id}`);
    Analytics.sendEvent({
      category: "savePoints",
      action: "removed",
      labels: [game.name],
    });
  } catch (err) {
    console.error(err);
  }
};

const tryAutoSave = async () => {
  Object.values(Stores.Settings.store.games).forEach(async (game) => {
    const isRunning = await isGameRunning(game);
    if (!isRunning) return;

    save(game, "autosave");
    console.log("Process running, game", game.exePath);
  });
};

const saveRunningGames = () => {
  Object.entries(Stores.Settings.store.games).map(async ([key, game]) => {
    const isRunning = await isGameRunning(game);
    if (isRunning) {
      save(game, "manualsave");
    }
  });
};

const Saves = {
  tryAutoSave,
  save,
  load,
  remove,
  saveRunningGames,
};

export default Saves;
