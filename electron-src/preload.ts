/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  revealInFileExplorer: (val: string) => ipcRenderer.invoke("revealInFileExplorer", val),
  saveGame: async (val: string) => ipcRenderer.invoke("saveGame", val),
  getState: async () => ipcRenderer.invoke("getState"),
  loadSavePoint: async (...args: any[]) => ipcRenderer.invoke("loadSavePoint", ...args),
  removeSavePoint: async (...args: any[]) =>
    ipcRenderer.invoke("removeSavePoint", ...args),
  openLatestReleasePage: () => ipcRenderer.invoke("openLatestReleasePage"),
  toggleAutoSave: () => ipcRenderer.invoke("toggleAutoSave"),
  changeAutoSaveInterval: (...args: any[]) =>
    ipcRenderer.invoke("changeAutoSaveInterval", ...args),
  chooseStorePath: () => ipcRenderer.invoke("chooseStorePath"),
  openProfileLink: () => ipcRenderer.invoke("openProfileLink"),
  chooseGameExe: (...args: any[]) => ipcRenderer.invoke("chooseGameExe", ...args),
  chooseSavesPath: (...args: any[]) => ipcRenderer.invoke("chooseSavesPath", ...args),
  editGame: (...args: any[]) => ipcRenderer.invoke("editGame", ...args),
  createGame: (...args: any[]) => ipcRenderer.invoke("createGame", ...args),
  openPcGamingWiki: () => ipcRenderer.invoke("openPcGamingWiki"),
  analyticsPageView: (...args: any[]) => ipcRenderer.invoke("analyticsPageView", ...args),

  onStateUpdate: (somfunc = () => null) => ipcRenderer.on("stateUpdate", somfunc),
});
