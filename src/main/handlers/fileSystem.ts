import { dialog, shell } from "electron";

import FileSystem from "../utils/fileSystem";
import { getFileNameWithExtension, getFilePath } from "../utils";

type TFileSystemHandlers = {
  openDialog: IPC.THandler<"openDialog">;
  revealInFileExplorer: IPC.THandler<"revealInFileExplorer">;
};

const FileSystemHandlers: TFileSystemHandlers = {
  openDialog: async (_, options) => {
    console.info("[fileSystem.ts/openDialog() options]", options);
    const filesOrDirs = dialog.showOpenDialogSync(options);
    if (!filesOrDirs) return null;
    console.info("[fileSystem.ts/openDialog() filesOrDirs]", filesOrDirs);
    const fileOrDir = FileSystem.normalizeUpath(filesOrDirs[0]);
    const isDirectory = FileSystem.isDir(fileOrDir);
    const path = isDirectory ? fileOrDir : getFilePath(fileOrDir);
    const files = isDirectory
      ? []
      : filesOrDirs.map((f) => getFileNameWithExtension(f));
    return { path, files };
  },
  revealInFileExplorer: async (_, pathString) => {
    shell.openPath(FileSystem.normalize(pathString));
  },
};

export default FileSystemHandlers;
export { TFileSystemHandlers };
