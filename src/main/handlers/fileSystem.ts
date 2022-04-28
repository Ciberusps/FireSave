import { dialog, shell } from "electron";

import ipcMain from "../utils/ipcMain";
import FileSystem from "../utils/fileSystem";
import { getFileNameWithExtension, getFilePath } from "../utils";

ipcMain.handle("openDialog", async (_, options) => {
  console.log("options", options);
  const filesOrDirs = dialog.showOpenDialogSync(options);
  if (!filesOrDirs) return null;
  console.log(filesOrDirs);
  const fileOrDir = filesOrDirs[0];
  const isDirectory = FileSystem.isDir(fileOrDir);
  const path = isDirectory ? fileOrDir : getFilePath(fileOrDir);
  const files = isDirectory
    ? null
    : filesOrDirs.map((f) => getFileNameWithExtension(f));
  return { path, files };
});

ipcMain.handle("revealInFileExplorer", async (_, path) => {
  shell.showItemInFolder(path);
});
