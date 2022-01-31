import path from "path";

import { RESOURCES_PATH } from "./config";

export const getFileNameWithExtension = (filePath: string): string =>
  path.basename(filePath);

export const getFilePath = (filePath: string) => path.dirname(filePath);

export const getAssetPath = (...paths: string[]): string =>
  path.join(RESOURCES_PATH, ...paths);
