// import original module declarations
import { IpcRenderer, Remote } from "electron";

declare global {
  var ipcRenderer: IpcRenderer;
  var remote: Remote;
}
