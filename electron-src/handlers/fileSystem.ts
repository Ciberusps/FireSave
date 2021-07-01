import { ipcMain, dialog, OpenDialogOptions, shell } from "electron";

import FileSystem from "../utils/fileSystem";
import { getFileNameWithExtension, getFilePath } from "../utils";

type TOpenDialogReturn = {
  path: string;
  files: string[] | null;
} | null;

ipcMain.handle(
  "openDialog",
  async (_, options: OpenDialogOptions): Promise<TOpenDialogReturn> => {
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
  }
);

ipcMain.handle("revealInFileExplorer", async (_, path: string) => {
  shell.showItemInFolder(path);
});
