import path from "path";
import { createHash } from "crypto";

import Store from "./store";

export const getFileNameWithExtension = (filePath: string): string =>
  path.basename(filePath);

export const getFileName = (filePath: string): string =>
  getFileNameWithExtension(filePath).split(".")[0];

export const getFilePath = (filePath: string) => path.dirname(filePath);

export const isGameExist = (exePath: string): boolean => {
  const isGameExist = Store.store.games.findIndex((g) => g.exePath === exePath) !== -1;
  console.log("isGameExist", !!isGameExist);
  return isGameExist;
};

export const getGameId = (exePath: string) =>
  createHash("sha1").update(exePath).digest("base64");
