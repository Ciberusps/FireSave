import { dialog, shell } from "electron";

import FileSystem from "../utils/fileSystem";
import { getFileNameWithExtension, getFilePath } from "../utils";

type TFileSystemHandlers = {
  openDialog: IPC.THandler<"openDialog">;
  revealInFileExplorer: IPC.THandler<"revealInFileExplorer">;
};

const FileSystemHandlers: TFileSystemHandlers = {
  openDialog: async (_, options) => {
    try {
      console.info("[fileSystem.ts/openDialog() options]", options);
      const filesOrDirs = dialog.showOpenDialogSync(options);
      if (!filesOrDirs) throw new Error("No files or directories selected");
      console.info("[fileSystem.ts/openDialog() filesOrDirs]", filesOrDirs);
      const fileOrDir = FileSystem.normalizeUpath(filesOrDirs[0]);
      const isDirectory = FileSystem.isDir(fileOrDir);
      const path = isDirectory ? fileOrDir : getFilePath(fileOrDir);
      const files = isDirectory
        ? []
        : filesOrDirs.map((f) => getFileNameWithExtension(f));
      return { success: true, result: { path, files } };
    } catch (err) {
      console.log(err);
      return { success: false, message: (err as any).message };
    }
  },
  revealInFileExplorer: async (_, pathString) => {
    try {
      const error = await shell.openPath(FileSystem.normalize(pathString));
      if (error) throw new Error(error);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, message: (err as any).message };
    }
  },
};

export default FileSystemHandlers;
export { TFileSystemHandlers };
