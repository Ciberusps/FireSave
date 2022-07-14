import globby from "globby";
import upath from "upath";
import VDF from "simple-vdf";
import { URL } from "url";

import FileSystem from "./fileSystem";
import { ASSETS_PATH, NODE_ENV, PORT, PLATFORM } from "./config";

export const resolveHtmlPath = (htmlFileName: string): string => {
  if (NODE_ENV === "development") {
    const port = PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${upath.resolve(__dirname, "../renderer/", htmlFileName)}`;
};

export const getFileNameWithExtension = (filePath: string): string =>
  upath.basename(filePath);

export const getFilePath = (filePath: string) => upath.dirname(filePath);

export const getAssetPath = (...paths: string[]): string =>
  upath.join(ASSETS_PATH, ...paths);

export const parseVdf = <T>(file: string): T => {
  return VDF.parse<T>(file);
};

export const getGlobby = async (
  options: IPC.TGetGlobbyOptions
): Promise<string[]> => {
  const { path, includeList, excludeList, isAbsolutePaths = false } = options;
  const patterns = [
    ...includeList,
    ...excludeList.map((exclude) => `!${exclude}`),
  ];
  const result = await globby(patterns, {
    cwd: path,
    // onlyFiles: false,
    markDirectories: true,
    absolute: isAbsolutePaths,
    // objectMode: true
  });
  console.info(`[utils/getGlobby()]`, { options, patterns, result });
  return result;
};

export const getCustomGameExePath = (
  gamePath: TPlatformSpecific<TFolderOrFilesRaw> | undefined
): string | null => {
  const folder = gamePath?.[PLATFORM]?.path;
  const file = gamePath?.[PLATFORM]?.files?.[0];

  if (folder && file) {
    const exePath = FileSystem.join(folder, file);
    return FileSystem.isExist(exePath) ? exePath : null;
  }
  return null;
};

export const getGamePathOnly = (game: TGame): string | undefined => {
  const path = game.gamePath?.[PLATFORM]?.path;
  return path;
};
