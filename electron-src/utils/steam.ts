import fs from "fs";
import path from "path";
import glob from "glob";
import axios from "axios";
// @ts-ignore
import VDF from "simple-vdf";
import Stores from "./stores";

const readFromFile = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getAllAppManifests = async (steamappsPath: string): Promise<TAppManifest[]> => {
  const pattern = path.join(steamappsPath, "*.acf");
  //   console.log("pattern", pattern);
  const matches = glob.sync(pattern);
  //   console.log("Manifests found", matches);

  const promises = matches.map((file) => readFromFile(file));

  return Promise.all(promises).then((result) => {
    const res = result.map((file) => VDF.parse(file) as TAppManifest);
    return res;
    //   baseListOfFiles = result[0];
    //   currentListOfFiles = result[1];
    // do more stuff
  });
};

const getGameManifest = async (steamappsPath: string, game: TGame) => {
  const allAppManifests = await getAllAppManifests(steamappsPath);
  //   console.log("allAppManifest", allAppManifests);
  const gameManifest = allAppManifests.find((manifest) =>
    game.exePath.includes(manifest.AppState.installdir)
  );
  //   console.log("MY GAME MANIFEST", gameManifest);
  return gameManifest;
};

export const fillSteamGameInfo = async (game: TGame) => {
  try {
    const steamappsPath = game.exePath.substring(
      0,
      game.exePath.indexOf("steamapps") + "steamapps".length
    );

    const manifest = await getGameManifest(steamappsPath, game);
    if (!manifest) throw new Error("Failed to find game manifest");

    const steamInfo = (
      await axios.get(
        `https://store.steampowered.com/api/appdetails/?appids=${manifest.AppState.appid}`
      )
    ).data;
    if (steamInfo?.[manifest.AppState.appid]?.data) {
      Stores.Settings.set(
        `games.${game.id}.steamInfo`,
        steamInfo[manifest.AppState.appid].data
      );
      Stores.Settings.set(`games.${game.id}.steamManifest`, manifest);
    }
  } catch (err) {
    // TODO: send logs
    console.error(err);
  }
};
