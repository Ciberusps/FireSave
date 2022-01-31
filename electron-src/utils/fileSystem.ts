import fs from "fs";

const isExist = (path: string) => fs.existsSync(path);

const removeFile = (path: string) => {
  if (isExist(path)) {
    fs.unlinkSync(path);
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

const FileSystem = {
  removeFile,
  createDir,
  isDir,
  isExist,
};

export default FileSystem;
