import path from "path";
import base64url from "base64url";
import { createHash } from "crypto";

import Store from "./store";
import { RESOURCES_PATH } from "./config";

export const getFileNameWithExtension = (filePath: string): string =>
  path.basename(filePath);

export const getFileName = (filePath: string): string =>
  getFileNameWithExtension(filePath).split(".")[0];

export const getFilePath = (filePath: string) => path.dirname(filePath);

export const isGameExist = (exePath: string): boolean => {
  const gameId = getId(exePath);
  const isGameExist = Store.has(`games.${gameId}`);
  console.log("isGameExist", !!isGameExist);
  return isGameExist;
};

export const getId = (path: string) =>
  base64url.fromBase64(createHash("sha1").update(path).digest("base64"));

export const getAssetPath = (...paths: string[]): string =>
  path.join(RESOURCES_PATH, ...paths);
