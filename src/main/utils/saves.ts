import fs from "fs";
import path from "path";
import findProcess from "find-process";
import faker from "faker";
// screenshot-desktop dont work without asarUnpack
// @ts-ignore
import screenshot from "screenshot-desktop";
import { format } from "date-fns";
import { nanoid } from "nanoid";

import Stores from "./stores";
import FileSystem from "./fileSystem";

const isGameRunning = async (game: TGame) => {
  console.log("Is game running", game.exePath);
  try {
    if (!game?.exePath) return false;
    const processName = game.exePath.files[0];
    console.log("Is game running processName", processName);
    const list = await findProcess("name", processName);
    console.log("list", list);
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

// TODO: should throw error
const getFileNameForNextSave = (file: string): string => {
  if (file.includes(".")) {
    const res = file.split(".");
    res[0] = res[0] + "_" + format(new Date(), "____HH-mm-ss__dd_MM_yyyy");
    return res.join(".");
  } else {
    console.log("ERROR ");
    return "";
  }
};

type TGetGameInfoRes = {
  savePointsPath: string;
  screenshotsPath: string;
};
const getGameInfo = (game: TGame): TGetGameInfoRes => {
  const savePointsPath = path.join(
    Stores.Persistent.store.settingsStorePath,
    game.savePointsFolderName
  );
  const screenshotsPath = path.join(savePointsPath, "screenshots");

  FileSystem.createDir(savePointsPath);
  FileSystem.createDir(screenshotsPath);

  return { savePointsPath, screenshotsPath };
};

type TCountStatsRes = {
  number: number;
  typeNumber: number;
};
const countSavePointStats = (
  game: TGame,
  type: TSavePointType
): TCountStatsRes => {
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

  return { number: curStats.allSavesCount, typeNumber };
};

const getSavePointPaths = (game: TGame, savePoint: TSavePoint) => {
  const gameInfo = getGameInfo(game);
  const screenshotPath =
    savePoint.screenshot &&
    path.join(gameInfo.screenshotsPath, savePoint.screenshot);
  const saveDataPath = path.join(gameInfo.savePointsPath, savePoint.path);
  return { screenshotPath, saveDataPath };
};

const save = async (
  game: TGame,
  type: TSavePointType,
  options?: { isBeforeLoad: boolean }
) => {
  try {
    const gameInfo = getGameInfo(game);

    // TODO: game.save -> game.fileOrFolderForSave
    if (game.saves?.files.length === 1) {
      const file = game.saves.files[0];
      const savePath = path.join(game.saves.path, file);
      const saveFileName = getFileNameForNextSave(file);
      const saveFileRelativePath = path.join(
        gameInfo.savePointsPath,
        getFileNameForNextSave(file)
      );

      if (!savePath) return;

      fs.copyFileSync(savePath, saveFileRelativePath);

      const savePointId = nanoid();
      const pathInStore = `games.${game.id}.savePoints.${savePointId}`;

      const savePointStats = countSavePointStats(game, type);

      const savePointData: TSavePoint = {
        id: savePointId,
        name: faker.random.words(2),
        date: new Date().toISOString(),
        path: saveFileName,
        type,
        number: savePointStats.number,
        typeNumber: savePointStats.typeNumber,
        tags: [type],
      };

      Stores.Settings.set(pathInStore, savePointData);

      const labels = [game.name, type];
      // before_load - when game not opened
      if (options?.isBeforeLoad) labels.push("before_load");

      const screenshotFileName = saveFileName.split(".")[0] + ".jpg";
      const screenshotFilePath = path.join(
        gameInfo.screenshotsPath,
        screenshotFileName
      );
      await screenshot({ filename: screenshotFilePath, format: "jpg" });
      Stores.Settings.set(pathInStore + ".screenshot", screenshotFileName);
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

    if (game.saves?.files.length === 1) {
      const file = game.saves.files[0];
      const savePath = path.join(game.saves.path, file);

      const { saveDataPath } = getSavePointPaths(game, savePoint);

      fs.copyFileSync(saveDataPath, savePath);

      console.log("LOADED");
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

    const { screenshotPath, saveDataPath } = getSavePointPaths(game, savePoint);

    if (screenshotPath) FileSystem.removeFile(screenshotPath);
    FileSystem.removeFile(saveDataPath);

    // @ts-ignore
    Stores.Settings.delete(`games.${gameId}.savePoints.${savePoint.id}`);
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
