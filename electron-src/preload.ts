/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getConfig: () => ipcRenderer.invoke("getConfig"),
  revealInFileExplorer: (val: string) => ipcRenderer.invoke("revealInFileExplorer", val),
  saveGame: async (val: string) => ipcRenderer.invoke("saveGame", val),
  getState: async () => ipcRenderer.invoke("getState"),
  loadSavePoint: async (...args: any[]) => ipcRenderer.invoke("loadSavePoint", ...args),
  removeSavePoint: async (...args: any[]) =>
    ipcRenderer.invoke("removeSavePoint", ...args),
  changeSettings: (...args: any[]) => ipcRenderer.invoke("changeSettings", ...args),
  editGame: (...args: any[]) => ipcRenderer.invoke("editGame", ...args),
  createGame: (...args: any[]) => ipcRenderer.invoke("createGame", ...args),
  analyticsPageView: (...args: any[]) => ipcRenderer.invoke("analyticsPageView", ...args),
  openDialog: (...args: any[]) => ipcRenderer.invoke("openDialog", ...args),
  isGameExist: (...args: any[]) => ipcRenderer.invoke("isGameExist", ...args),

  onStateUpdate: (somfunc = () => null) => ipcRenderer.on("stateUpdate", somfunc),
});
