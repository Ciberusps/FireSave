// import original module declarations
import { IpcRenderer } from "electron";

declare global {
  var ipcRenderer: IpcRenderer;
}
