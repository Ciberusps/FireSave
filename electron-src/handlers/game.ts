import { ipcMain } from "electron";
import { nanoid } from "nanoid";

import Stores from "../utils/stores";
import Analytics from "../utils/analytics";
import FileSystem from "../utils/fileSystem";
import { fillSteamGameInfo } from "../utils/steam";

const generateUniqGameId = (limit = 5): string | null => {
  let result = null;
  for (let i = 0; i < limit; i++) {
    result = nanoid();
    if (!Stores.Settings.has(`games.${result}`)) {
      break;
    }
  }
  return result;
};

const isGameExist = (exePath: TFolderOrFileOrMultipleFiles): boolean => {
  let result = false;
  const allGames = Stores.Settings.get("games");
  // TODO: add check by steam info?
  result = Boolean(Object.values(allGames).find((g) => g.exePath === exePath));
  // @ts-ignore
  console.log("isGameExist", result);
  return result;
};

type TCreateGamePayload = {
  exePath: TFolderOrFileOrMultipleFiles;
  saves: TFolderOrFileOrMultipleFiles;
};

ipcMain.handle("createGame", async (_, { exePath, saves }: TCreateGamePayload) => {
  if (isGameExist(exePath)) {
    console.error("GAME ALREADY EXISTS");
    return false;
  }

  const id = generateUniqGameId();
  if (!id) {
    console.error("Cant generate game id");
    return false;
  }

  const name = exePath.files[0].split(".")[0];

  const savePointsFolderName = name + "___" + id;
  if (FileSystem.isExist(savePointsFolderName)) {
    console.error("Dir already exist");
    return false;
  }

  const newGame: TGame = {
    id,
    name,
    exePath,
    savePointsFolderName,
    saves,
    stats: { allSavesCount: 0, autoSaveCount: 0, manualSaveCount: 0 },
  };
  Stores.Settings.set(`games.${id}`, newGame);

  Analytics.sendEvent({ category: "games", action: "added", labels: [name] });

  const isSteamGame = exePath.path.includes("steamapps");
  if (isSteamGame) fillSteamGameInfo(newGame);

  return true;
});

type TEditGamePayload = {
  game: TGame;
  exePath: TFolderOrFileOrMultipleFiles;
  saves: TFolderOrFileOrMultipleFiles;
};

ipcMain.handle("editGame", async (_, { game, exePath, saves }: TEditGamePayload) => {
  game.exePath = exePath;
  game.saves = saves;
  Stores.Settings.set(`games.${game.id}`, game);
  return true;
});

ipcMain.handle("removeGame", async (_, id) => {
  // @ts-ignore
  Stores.Settings.delete(`games.${id}`);
  return true;
});
