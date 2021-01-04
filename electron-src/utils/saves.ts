import fs from "fs";
import path from "path";
import findProcess from "find-process";
// @ts-ignore
import screenshot from "screenshot-desktop";
import { format } from "date-fns";

import Store from "./store";
import { getId, getFileNameWithExtension } from ".";

const isProcessRunning = async (processName: string) => {
  try {
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

      if (!fs.existsSync(gameStorePath)) {
        fs.mkdirSync(gameStorePath, { recursive: true });
      }

      fs.copyFileSync(savePath, saveStorePath);

      const savePointId = getId(saveStorePath);
      const savePointPathInStore = `games.${game.id}.savePoints.${savePointId}`;
      Store.set(savePointPathInStore, {
        id: savePointId,
        date: new Date().toISOString(),
        path: saveStorePath,
      });

      const screenshotsPath = path.join(gameStorePath, "screenshots");
      if (!fs.existsSync(screenshotsPath)) {
        fs.mkdirSync(screenshotsPath, { recursive: true });
      }
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

const tryAutoSave = async () => {
  Object.values(Store.store.games).forEach(async (game) => {
    const processName = getFileNameWithExtension(game.exePath);
    const isGameRunning = await isProcessRunning(processName);
    if (!isGameRunning) return;

    save(game);
    console.log("Process running, game", processName, game.exePath);
  });
};

const Saves = {
  tryAutoSave,
};

export default Saves;
