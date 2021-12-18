import { ipcMain } from "electron";

import Stores from "../utils/stores";
import Analytics from "../utils/analytics";
import { getFileName, getId, isGameExist } from "../utils";
import { fillSteamGameInfo } from "../utils/steam";

type TCreateGamePayload = {
  exePath: string;
  saves: TSaves;
};

ipcMain.handle("createGame", async (_, { exePath, saves }: TCreateGamePayload) => {
  if (!isGameExist(exePath)) {
    const id = getId(exePath);
    const name = getFileName(exePath);
    const newGame: TGame = {
      id,
      name,
      exePath,
      saves,
      stats: { allSavesCount: 0, autoSaveCount: 0, manualSaveCount: 0 },
    };
    Stores.Settings.set(`games.${id}`, newGame);

    Analytics.sendEvent({ category: "games", action: "added", labels: [name] });

    const isSteamGame = exePath.includes("steamapps");
    if (isSteamGame) fillSteamGameInfo(newGame);

    return true;
  } else {
    console.error("GAME ALREADY EXISTS");
    return false;
  }
});

type TEditGamePayload = {
  game: TGame;
  exePath: string;
  saves: TSaves;
};

ipcMain.handle("editGame", async (_, { game, exePath, saves }: TEditGamePayload) => {
  const oldId = game.id;
  const newId = getId(exePath);
  const newGameName = getFileName(exePath);
  game.id = newId;
  game.name = newGameName;
  game.exePath = exePath;
  game.saves = saves;
  if (oldId !== newId) {
    // @ts-ignore
    Stores.Settings.delete(`games.${oldId}`);
  }
  Stores.Settings.set(`games.${newId}`, game);
  return true;
});

ipcMain.handle("removeGame", async (_, id) => {
  // @ts-ignore
  Stores.Settings.delete(`games.${id}`);
  return true;
});
