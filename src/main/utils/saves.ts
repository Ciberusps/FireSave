import path from "path";
import faker from "@faker-js/faker";
import copy from "recursive-copy";
// screenshot-desktop dont work without asarUnpack
// @ts-ignore
import screenshot from "screenshot-desktop";
import { format } from "date-fns";
import { nanoid } from "nanoid";

import Stores from "../stores";
import FileSystem from "./fileSystem";
import Games from "./games";
import { PLATFORM } from "./config";
import { getGlobby, joinAndNormalize } from ".";

const SCREENSHOTS_FOLDER_NAME = "__screenshots";

// TODO: should throw error
const getFolderNameForNextSave = (folderName: string): string => {
  if (folderName.includes(".")) {
    const res = folderName.split(".");
    res[0] = `${res[0]}_${format(new Date(), "__HH-mm-ss__dd_MM_yyyy")}`;
    return res.join(".");
  }
  console.log("ERROR ");
  return "";
};

const getOrCreateSavesFolder = (game: TGame): string => {
  const savesFolderPath = `${joinAndNormalize(
    Stores.Persistent.store.settingsStorePath,
    `${game.savePointsFolderName}__${game.id}`
  )}`;

  FileSystem.createDir(savesFolderPath);

  return savesFolderPath;
};

type TCountStatsRes = {
  number: number;
  typeNumber: number;
};
const countSavePointStats = (game: TGame, type: TSaveType): TCountStatsRes => {
  let typeNumber = 0;
  const statsPath = `games.${game.id}.savesStats`;
  const curStats = game.savesStats;
  Stores.Games.set(`${statsPath}.total`, curStats.total + 1);
  if (type === "manual") {
    typeNumber = curStats.manual + 1;
    Stores.Games.set(`${statsPath}.manual`, typeNumber);
  } else {
    typeNumber = curStats.auto + 1;
    Stores.Games.set(`${statsPath}.auto`, typeNumber);
  }

  return { number: curStats.total, typeNumber };
};

const getSavePointPaths = (game: TGame, savePoint: TSave) => {
  const gameInfo = getOrCreateSavesFolder(game);
  const screenshotPath =
    savePoint.screenshotFileName &&
    path.join(gameInfo.screenshotsFolderPath, savePoint.screenshotFileName);
  const saveDataPath = path.join(gameInfo.savesFolderPath, savePoint.path);
  return { screenshotPath, saveDataPath };
};

const makeSave = async (
  gameId: string,
  type: TSaveType,
  // TODO: rename isBeforeLoad
  options?: { isBeforeLoad: boolean }
) => {
  try {
    const game = Stores.Games.store.games?.[gameId];
    const savesFolder = getOrCreateSavesFolder(game);
    if (!game) throw new Error("Game not found");
    if (!game.isValid) throw new Error("Game is not valid");

    // TODO: game.save -> game.fileOrFolderForSave
    const savesConfig = game.savesConfig?.[PLATFORM];
    if (!savesConfig) throw new Error("Saves config not found");

    const saveConfigFolderPath = savesConfig.saveFolder.path;
    if (!saveConfigFolderPath) throw new Error("Save config folder not found");

    const newSaveId = nanoid();
    const newSaveFolderName = joinAndNormalize(
      newSaveId + format(new Date(), "__HH-mm-ss__dd_MM_yyyy")
    );
    const newSaveFolder = joinAndNormalize(savesFolder, newSaveFolderName);
    // FileSystem.createDir(newSaveFolder);
    console.log({
      gameFolders: savesFolder,
      // filesToSave,
      newSaveFolder,
    });

    await copy(saveConfigFolderPath, newSaveFolder, {
      filter: [
        ...(savesConfig.saveFullFolder ? ["**/*"] : []),
        ...savesConfig.includeList,
        ...savesConfig.excludeList.map((exclude) => `!${exclude}`),
      ],
    });

    const savePointStats = countSavePointStats(game, type);

    const tags: string[] = [type];
    // before_load - when game not opened
    if (options?.isBeforeLoad) tags.push("before_load");

    const savePointData: TSave = {
      id: newSaveId,
      name: faker.random.words(2),
      date: new Date().toISOString(),
      folderName: newSaveFolderName,
      type,
      saveNumber: savePointStats.number,
      saveNumberByType: savePointStats.typeNumber,
      tags,
    };
    Stores.Games.set(`savePoints.${gameId}.${newSaveId}`, savePointData);

    const screenshotFolderPath = joinAndNormalize(
      newSaveFolder,
      SCREENSHOTS_FOLDER_NAME
    );
    const screenshotFileName = `screenshot.jpg`;
    const screenshotFilePath = joinAndNormalize(
      screenshotFolderPath,
      screenshotFileName
    );
    FileSystem.createDir(screenshotFolderPath);

    console.log({ screenshotFolderPath, screenshotFilePath });
    await screenshot({ filename: screenshotFilePath, format: "jpg" });

    Stores.Games.set(
      `savePoints.${gameId}.${newSaveId}.screenshotFileName`,
      screenshotFileName
    );
  } catch (err) {
    // TODO: send logs
    console.error(err);
  }
};

const loadSave = async (gameId: string, savePointId: string) => {
  // TODO: copy save without `!${SCREENSHOTS_FOLDER_NAME}`
  try {
    const game = Stores.Games.store.games[gameId];
    const gameSavePoints = Stores.Games.store.savePoints[gameId];
    const savePoint = gameSavePoints?.[savePointId];
    if (!game) throw new Error("Game not found");
    if (!savePoint) throw new Error("SavePoint not found");

    await makeSave(game, "manual", { isBeforeLoad: true });

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

const removeSave = async (gameId: string, savePointId: string) => {
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
      makeSave(game, "auto");
    }
  });
};

const saveRunningGames = async () => {
  console.log("Try save running games");
  await Games.updateRunningGames();

  Object.values(Stores.Games.store.games).forEach((game) => {
    if (game.isPlaingNow) {
      makeSave(game, "auto");
    }
  });
};

const Saves = {
  tryAutoSave,
  makeSave,
  loadSave,
  removeSave,
  saveRunningGames,
};

export default Saves;
