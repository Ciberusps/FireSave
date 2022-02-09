import path from "path";
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
