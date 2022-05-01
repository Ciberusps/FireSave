import fs from "fs";
import path from "path";
import faker from "@faker-js/faker";
// screenshot-desktop dont work without asarUnpack
// @ts-ignore
import screenshot from "screenshot-desktop";
import { format } from "date-fns";
import { nanoid } from "nanoid";

import Stores from "../stores";
import FileSystem from "./fileSystem";
import Games from "./games";
import { PLATFORM } from "./config";

// TODO: should throw error
const getFileNameForNextSave = (file: string): string => {
  if (file.includes(".")) {
    const res = file.split(".");
    res[0] = `${res[0]}_${format(new Date(), "____HH-mm-ss__dd_MM_yyyy")}`;
    return res.join(".");
  }
  console.log("ERROR ");
  return "";
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
  const statsPath = `games.${game.id}.savesStats`;
  const curStats = game.savesStats;
  Stores.Games.set(`${statsPath}.total`, curStats.total + 1);
  if (type === "manualsave") {
    typeNumber = curStats.manual + 1;
    Stores.Games.set(`${statsPath}.manual`, typeNumber);
  } else {
    typeNumber = curStats.auto + 1;
    Stores.Games.set(`${statsPath}.auto`, typeNumber);
  }

  return { number: curStats.total, typeNumber };
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
    if (game.saveFilesOrFolder?.[PLATFORM]?.files.length === 1) {
      const file = game.saveFilesOrFolder?.[PLATFORM]?.files[0];
      const savePath = path.join(
        game.saveFilesOrFolder?.[PLATFORM]?.path,
        file
      );
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
        saveNumber: savePointStats.number,
        saveNumberByType: savePointStats.typeNumber,
        tags: [type],
      };

      Stores.Games.set(pathInStore, savePointData);

      const labels = [game.name, type];
      // before_load - when game not opened
      if (options?.isBeforeLoad) labels.push("before_load");

      const screenshotFileName = `${saveFileName.split(".")[0]}.jpg`;
      const screenshotFilePath = path.join(
        gameInfo.screenshotsPath,
        screenshotFileName
      );
      await screenshot({ filename: screenshotFilePath, format: "jpg" });
      Stores.Games.set(`${pathInStore}.screenshot`, screenshotFileName);
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
    const game = Stores.Games.store.games[gameId];
    const gameSavePoints = Stores.Games.store.savePoints[gameId];
    const savePoint = gameSavePoints?.[savePointId];
    if (!game) throw new Error("Game not found");
    if (!savePoint) throw new Error("SavePoint not found");

    await save(game, "manualsave", { isBeforeLoad: true });

    if (game.saveFilesOrFolder?.[PLATFORM]?.files.length === 1) {
      const file = game.saveFilesOrFolder?.[PLATFORM]?.files[0];
      if (!file) throw new Error("Save file not found");
      const savePath = path.join(
        game.saveFilesOrFolder?.[PLATFORM]?.path,
        file
      );

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
    const game = Stores.Games.store.games[gameId];
    const savePoint = game.savePoints?.[savePointId];
    if (!savePoint) throw new Error("SavePoint not found");

    const { screenshotPath, saveDataPath } = getSavePointPaths(game, savePoint);

    if (screenshotPath) FileSystem.removeFile(screenshotPath);
    FileSystem.removeFile(saveDataPath);

    // @ts-ignore
    Stores.Games.delete(`games.${gameId}.savePoints.${savePoint.id}`);
  } catch (err) {
    console.error(err);
  }
};

const tryAutoSave = async () => {
  console.log("Try autosave running games");
  await Games.updateRunningGames();

  Object.values(Stores.Games.store.games).forEach((game) => {
    if (game.isPlaingNow) {
      save(game, "autosave");
    }
  });
};

const saveRunningGames = async () => {
  console.log("Try save running games");
  await Games.updateRunningGames();

  Object.values(Stores.Games.store.games).forEach((game) => {
    if (game.isPlaingNow) {
      save(game, "autosave");
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
