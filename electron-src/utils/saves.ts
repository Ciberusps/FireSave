import fs from "fs";
import path from "path";
import findProcess from "find-process";
// @ts-ignore
import screenshot from "screenshot-desktop";
import { format } from "date-fns";

import Store from "./store";
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

const save = async (game: TGame) => {
  try {
    const gameStorePath = path.join(Store.store.storePath, game.name);

    if (game.saves.files.length === 1) {
      const file = game.saves.files[0];
      const savePath = path.join(game.saves.path, file);
      const saveStoreFileName = getSaveStoreFileName(file);
      const saveStorePath = path.join(gameStorePath, getSaveStoreFileName(file));

      // console.log("SavePath", savePath, saveStorePath);
      if (!savePath) return;

      FileSystem.createDir(gameStorePath);

      fs.copyFileSync(savePath, saveStorePath);

      const savePointId = getId(saveStorePath);
      const savePointPathInStore = `games.${game.id}.savePoints.${savePointId}`;
      Store.set(savePointPathInStore, {
        id: savePointId,
        date: new Date().toISOString(),
        path: saveStorePath,
      });

      const screenshotsPath = path.join(gameStorePath, "screenshots");
      FileSystem.createDir(screenshotsPath);
      const screenshotFilePath = path.join(
        screenshotsPath,
        saveStoreFileName.split(".")[0] + ".jpg"
      );
      console.log(screenshotFilePath);
      await screenshot({ filename: screenshotFilePath, format: "jpg" });
      Store.set(savePointPathInStore + ".screenshot", screenshotFilePath);
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
    const game = Store.store.games[gameId];
    const savePoint = game.savePoints?.[savePointId];
    if (!savePoint) throw new Error("SavePoint not found");

    await save(game);

    if (game.saves.files.length === 1) {
      const file = game.saves.files[0];
      const savePath = path.join(game.saves.path, file);

      fs.copyFileSync(savePoint.path, savePath);
      console.log("LOADED");
    } else {
      throw new Error("Need support for many files");
    }
  } catch (err) {
    console.error(err);
  }
};

const remove = async (gameId: string, savePointId: string) => {
  try {
    const game = Store.store.games[gameId];
    const savePoint = game.savePoints?.[savePointId];
    if (!savePoint) throw new Error("SavePoint not found");
    if (savePoint?.screenshot) FileSystem.removeFile(savePoint.screenshot);
    FileSystem.removeFile(savePoint.path);
    // @ts-ignore
    Store.delete(`games.${gameId}.savePoints.${savePoint.id}`);
  } catch (err) {
    console.error(err);
  }
};

const tryAutoSave = async () => {
  Object.values(Store.store.games).forEach(async (game) => {
    const isRunning = await isGameRunning(game);
    if (!isRunning) return;

    save(game);
    console.log("Process running, game", game.exePath);
  });
};

const Saves = {
  tryAutoSave,
  save,
  load,
  remove,
};

export default Saves;
