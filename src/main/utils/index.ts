import path from "path";
// @ts-ignore
import VDF from "simple-vdf";
import { URL } from "url";

import { RESOURCES_PATH, NODE_ENV, PORT } from "./config";

export const resolveHtmlPath = (htmlFileName: string): string => {
  if (NODE_ENV === "development") {
    const port = PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
};

export const getFileNameWithExtension = (filePath: string): string =>
  path.basename(filePath);

export const getFilePath = (filePath: string) => path.dirname(filePath);

export const getAssetPath = (...paths: string[]): string =>
  path.join(RESOURCES_PATH, ...paths);

export const parseVdf = <T>(file: string): T => {
  return VDF.parse(file) as T;
};

export const joinAndNormalize = (...args: string[]) => {
  return path.normalize(path.join(...args));
};
