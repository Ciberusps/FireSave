import fs from "fs";
import path from "path";
import findProcess from "find-process";
import { format } from "date-fns";

import Store from "./store";
import { getFileName } from ".";

const isProcessRunning = async (processName: string) => {
  try {
    const list = await findProcess("name", processName);
    if (list?.length) {
      console.log("Process found", list?.length);
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
    res[0] = res[0] + "_" + format(new Date(), "____HH-mm|ss__dd_MM_yyyy");
    return res.join(".");
  } else {
    console.log("ERROR ");
    return "";
  }
};

const tryAutoSave = async () => {
  Store.store.games.forEach(async (game) => {
    const processName = getFileName(game.exePath);
    const gameName = processName.replace(".exe", "");

    const isGameRunning = await isProcessRunning(processName);
    if (isGameRunning) {
      console.log("Process running, game", processName, game.exePath);

      const gameStorePath = path.join(Store.store.storePath, gameName);

      game.saves.files.forEach((file) => {
        const savePath = path.join(game.saves.path, file);

        const saveStorePath = path.join(gameStorePath, getSaveStoreFileName(file));

        console.log("SavePath", savePath, saveStorePath);
        if (!savePath) return;

        if (!fs.existsSync(gameStorePath)) {
          fs.mkdirSync(gameStorePath);
        }

        const res = fs.copyFileSync(savePath, saveStorePath);
        console.log("RES SAVED?", res);
      });
    }
  });
};

const Saves = {
  tryAutoSave,
};

export default Saves;
