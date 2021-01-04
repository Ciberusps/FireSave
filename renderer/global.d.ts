// import original module declarations
import { IpcRenderer, Remote } from "electron";

declare global {
  var ipcRenderer: IpcRenderer;
  var remote: Remote;

  type TStore = {
    isAutoSaveOn: boolean;
    autoSaveMinutes: number;
    storePath: string;
    games: { [key: string]: TGame };
  };

  type TGame = {
    id: string;
    name: string;
    steamAppId: string;
    exePath: string; // id
    saves: TSaves;
    savePoints: { [key: string]: TSavePoints };
  };

  type TSaves = {
    path: string;
    files: string[];
  };

  type TSavePoints = {
    id: string;
    date: string;
    path: string;
    screenshot?: string;
  };
}
