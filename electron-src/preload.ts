/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, IpcRenderer, remote, Remote } from "electron";

declare global {
  // interface Window {
  //   remote: Remote;
  // }
  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
      remote: Remote;
    }
  }
}

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once("loaded", () => {
  global.ipcRenderer = ipcRenderer;
  // window.remote = remote;
});
