import fs from "fs";
import path from "path";
import upath from "upath";
import fsExtra from "fs-extra";

const isExist = (path: string) => fs.existsSync(path);
const isPathExist = (path: string): Promise<boolean> =>
  fsExtra.pathExists(path);

const removeFileOrFolder = (pathString: string) => {
  if (isExist(pathString)) {
    fs.rmSync(pathString, { recursive: true, force: true });
  }
};

const createDir = (pathString: string) => {
  if (!isExist(pathString)) {
    fs.mkdirSync(pathString, { recursive: true });
  }
};

const isDir = (path: string) => {
  return fs.lstatSync(path).isDirectory();
};

const writeFileSync = (...args: Parameters<typeof fs.writeFileSync>) => {
  return fs.writeFileSync(...args);
};

const copyFolder = fsExtra.copySync;

const isPathsEqual = (path1: string, path2: string): boolean => {
  return normalizeUpath(path1) === normalizeUpath(path2);
};

const normalizeUpath = (pathString: string): string => {
  return upath.normalize(pathString);
};

const normalize = (pathString: string): string => {
  return path.normalize(pathString);
};

const join = path.join;

const joinUpath = upath.join;

const normalizePathForCurrentOS = (pathString: string): string => {
  return path.normalize(pathString);
};

const renameFolder = fs.promises.rename;

const FileSystem = {
  writeFileSync,
  copyFolder,
  removeFileOrFolder,
  createDir,
  isDir,
  isExist,
  isPathExist,
  isPathsEqual,
  normalize,
  normalizeUpath,
  join,
  joinUpath,
  normalizePathForCurrentOS,
  renameFolder,
};

export default FileSystem;
