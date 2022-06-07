import globby from "globby";
import upath from "upath";
// @ts-ignore
import VDF from "simple-vdf";
import { URL } from "url";

import FileSystem from "./fileSystem";
import { RESOURCES_PATH, NODE_ENV, PORT, PLATFORM } from "./config";

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
  upath.join(RESOURCES_PATH, ...paths);

export const parseVdf = <T>(file: string): T => {
  return VDF.parse(file) as T;
};

export const joinAndNormalize = (...args: string[]) => {
  return upath.normalize(upath.join(...args));
};

export const getGlobby = async (
  options: IPC.TGetGlobbyOptions
): Promise<string[]> => {
  const { path, includeList, excludeList, isAbsolutePaths = false } = options;
  console.log({ path, includeList, excludeList });
  return globby(
    [...includeList, ...excludeList.map((exclude) => `!${exclude}`)],
    {
      cwd: path,
      // onlyFiles: false,
      markDirectories: true,
      absolute: isAbsolutePaths,
      // objectMode: true
    }
  );
};

export const gamePathToExePath = (
  gamePath: TPlatformSpecific<TFolderOrFilesRaw> | undefined
): string | null => {
  const folder = gamePath?.[PLATFORM]?.path;
  const file = gamePath?.[PLATFORM]?.files?.[0];

  if (folder && file) {
    const exePath = joinAndNormalize(folder, file);
    return FileSystem.isExist(exePath) ? exePath : null;
  }
  return null;
};
