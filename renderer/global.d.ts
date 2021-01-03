// import original module declarations
import { IpcRenderer, Remote } from "electron";

declare global {
  var ipcRenderer: IpcRenderer;
  var remote: Remote;

  type TStore = {
    isAutoSaveOn: boolean;
    storePath: string;
    games: TGame[];
  };

  type TGame = {
    name: string;
    steamAppId: string;
    exePath: string; // id
    saves: {
      path: string;
      files: string[];
    };
  };
}
