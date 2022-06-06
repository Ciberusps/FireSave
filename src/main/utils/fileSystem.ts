import fs from "fs";

const isExist = (path: string) => fs.existsSync(path);

const removeFileOrFolder = (path: string) => {
  if (isExist(path)) {
    fs.rmSync(path, { recursive: true, force: true });
  }
};

const createDir = (path: string) => {
  if (!isExist(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

const isDir = (path: string) => {
  return fs.lstatSync(path).isDirectory();
};

const writeFileSync = (...args: Parameters<typeof fs.writeFileSync>) => {
  return fs.writeFileSync(...args);
};

const FileSystem = {
  writeFileSync,
  removeFileOrFolder,
  createDir,
  isDir,
  isExist,
};

export default FileSystem;
