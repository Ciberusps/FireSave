/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getConfig: () => ipcRenderer.invoke("getConfig"),
  revealInFileExplorer: (val: string) => ipcRenderer.invoke("revealInFileExplorer", val),
  saveGame: async (val: string) => ipcRenderer.invoke("saveGame", val),
  getSettingsStore: async () => ipcRenderer.invoke("getSettingsStore"),
  getPersistentStore: async () => ipcRenderer.invoke("getPersistentStore"),
  loadSavePoint: async (...args: any[]) => ipcRenderer.invoke("loadSavePoint", ...args),
  removeSavePoint: async (...args: any[]) =>
    ipcRenderer.invoke("removeSavePoint", ...args),
  changeSettings: (...args: any[]) => ipcRenderer.invoke("changeSettings", ...args),
  changePersistentStore: (...args: any[]) =>
    ipcRenderer.invoke("changePersistentStore", ...args),
  editGame: (...args: any[]) => ipcRenderer.invoke("editGame", ...args),
  createGame: (...args: any[]) => ipcRenderer.invoke("createGame", ...args),
  analyticsPageView: (...args: any[]) => ipcRenderer.invoke("analyticsPageView", ...args),
  openDialog: (...args: any[]) => ipcRenderer.invoke("openDialog", ...args),
  isGameExist: (...args: any[]) => ipcRenderer.invoke("isGameExist", ...args),

  onStateUpdate: (somfunc = () => null) => ipcRenderer.on("stateUpdate", somfunc),
  onPersistentStoreUpdate: (somfunc = () => null) =>
    ipcRenderer.on("persistentStoreUpdate", somfunc),
});
