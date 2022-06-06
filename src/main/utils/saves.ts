import faker from "@faker-js/faker";
import copy from "recursive-copy";
import { format } from "date-fns";
import { nanoid } from "nanoid";

import Games from "./games";
import Stores from "../stores";
import Capture from "./capture";
import FileSystem from "./fileSystem";
import { PLATFORM, SCREENSHOTS_FOLDER_NAME } from "./config";
import { getGlobby, joinAndNormalize } from ".";

const getOrCreateSavesFolder = (game: TGame): string => {
  const savesFolderPath = joinAndNormalize(
    Stores.Persistent.store.settingsStorePath,
    `${game.savePointsFolderName}__${game.id}`
  );

  FileSystem.createDir(savesFolderPath);

  return savesFolderPath;
};

const getSavePointFolder = (game: TGame, savePoint: TSavePoint): string => {
  return joinAndNormalize(getOrCreateSavesFolder(game), savePoint.folderName);
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

const makeSavePoint = async (
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

    const savesConfigFolderPath = savesConfig.saveFolder.path;
    if (!savesConfigFolderPath) throw new Error("Save config folder not found");

    const newSavePointId = nanoid();
    const newSaveFolderName = joinAndNormalize(
      newSavePointId + format(new Date(), "__HH-mm-ss__dd_MM_yyyy")
    );
    const newSaveFolder = joinAndNormalize(savesFolder, newSaveFolderName);
    // FileSystem.createDir(newSaveFolder);
    console.log({
      gameFolders: savesFolder,
      // filesToSave,
      newSaveFolder,
      exclude: savesConfig.excludeList.map((exclude) => `!${exclude}`),
    });

    const filesToCopy = await getGlobby({
      path: savesConfigFolderPath,
      includeList: [
        ...(savesConfig.saveFullFolder ? ["**/*"] : []),
        ...savesConfig.includeList,
      ],
      excludeList: savesConfig.excludeList,
    });
    await copy(savesConfigFolderPath, newSaveFolder, {
      filter: filesToCopy,
    });

    const savePointStats = countSavePointStats(game, type);

    const tags: string[] = [type];
    // before_load - when game not opened
    if (options?.isBeforeLoad) tags.push("before_load");

    const savePointData: TSavePoint = {
      id: newSavePointId,
      name: faker.random.words(2),
      date: new Date().toISOString(),
      folderName: newSaveFolderName,
      type,
      saveNumber: savePointStats.number,
      saveNumberByType: savePointStats.typeNumber,
      tags,
    };
    Stores.Games.set(`savePoints.${gameId}.${newSavePointId}`, savePointData);

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
    const screenShot = await Capture.makeSelectedDisplayScreenShot();
    if (screenShot) {
      FileSystem.writeFileSync(screenshotFilePath, screenShot);
      Stores.Games.set(
        `savePoints.${gameId}.${newSavePointId}.screenshotFileName`,
        screenshotFileName
      );
    }
  } catch (err) {
    // TODO: send logs
    console.error(err);
  }
};

const loadSavePoint = async (gameId: string, savePointId: string) => {
  try {
    const game = Stores.Games.store.games?.[gameId];
    if (!game) throw new Error("Game not found");
    const savePoints = Stores.Games.store.savePoints?.[gameId];
    if (!savePoints) throw new Error("SavePoints not found");
    const savePoint = savePoints?.[savePointId];
    if (!savePoint) throw new Error("SavePoint not found");

    await makeSavePoint(gameId, "manual", { isBeforeLoad: true });

    const savePointFolder = getSavePointFolder(game, savePoint);
    const gameSaveFolderPath = game.savesConfig?.[PLATFORM]?.saveFolder.path;
    if (!gameSaveFolderPath) throw new Error("Game save folder not found");

    const filesToCopy = await getGlobby({
      path: savePointFolder,
      includeList: ["**/*"],
      excludeList: [SCREENSHOTS_FOLDER_NAME],
    });
    await copy(savePointFolder, gameSaveFolderPath, {
      filter: filesToCopy,
      overwrite: true,
    });

    // TODO: send Toaster message that game loaded
    console.log("LOADED");

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const removeSavePoint = async (gameId: string, savePointId: string) => {
  try {
    const game = Stores.Games.store.games?.[gameId];
    if (!game) throw new Error("Game not found");
    const savePoint = Stores.Games.store.savePoints?.[gameId]?.[savePointId];
    if (!savePoint) throw new Error("SavePoint not found");

    const savePointFolder = getSavePointFolder(game, savePoint);
    FileSystem.removeFileOrFolder(savePointFolder);

    // @ts-ignore
    Stores.Games.delete(`savePoints.${gameId}.${savePoint.id}`);
  } catch (err) {
    // TODO: send error
    console.error(err);
  }
};

const tryAutoSave = async () => {
  console.log("Try autosave running games");
  await Games.updateRunningGames();

  Object.values(Stores.Games.store.games).forEach((game) => {
    if (game.isPlaingNow) {
      makeSavePoint(game.id, "auto");
    }
  });
};

const saveRunningGames = async () => {
  console.log("Try save running games");
  await Games.updateRunningGames();

  Object.values(Stores.Games.store.games).forEach((game) => {
    if (game.isPlaingNow) {
      makeSavePoint(game.id, "auto");
    }
  });
};

const Saves = {
  tryAutoSave,
  makeSavePoint,
  loadSavePoint,
  removeSavePoint,
  saveRunningGames,
};

export default Saves;
