import fs from "fs";
import path from "path";
import upath from "upath";
import fsExtra from "fs-extra";

const isExist = (path: string) => fs.existsSync(path);

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
  return joinAndNormalizeUpath(path1) === joinAndNormalizeUpath(path2);
};

const normalizeUpath = (pathString: string): string => {
  return upath.normalize(pathString);
};

const joinAndNormalizeUpath = (...args: string[]) => {
  return normalizeUpath(upath.join(...args));
};

const normalizePathForCurrentOS = (pathString: string): string => {
  return path.normalize(pathString);
};

const FileSystem = {
  writeFileSync,
  copyFolder,
  removeFileOrFolder,
  createDir,
  isDir,
  isExist,
  isPathsEqual,
  normalizeUpath,
  joinAndNormalizeUpath,
  normalizePathForCurrentOS,
};

export default FileSystem;
