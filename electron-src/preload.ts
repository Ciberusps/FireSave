/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer, contextBridge } from "electron";

const electronApi: TElectronApi = {
  getConfig: () => ipcRenderer.invoke("getConfig"),

  revealInFileExplorer: (val: string) => ipcRenderer.invoke("revealInFileExplorer", val),

  saveGame: async (val: string) => ipcRenderer.invoke("saveGame", val),
  loadSavePoint: async (...args: any[]) => ipcRenderer.invoke("loadSavePoint", ...args),
  removeSavePoint: async (...args: any[]) =>
    ipcRenderer.invoke("removeSavePoint", ...args),

  createGame: (...args: any[]) => ipcRenderer.invoke("createGame", ...args),
  editGame: (...args: any[]) => ipcRenderer.invoke("editGame", ...args),
  removeGame: (...args) => ipcRenderer.invoke("removeGame", ...args),

  analyticsPageView: (...args: any[]) => ipcRenderer.invoke("analyticsPageView", ...args),
  openDialog: (...args: any[]) => ipcRenderer.invoke("openDialog", ...args),

  getSettingsStore: async () => ipcRenderer.invoke("getSettingsStore"),
  changeSettings: (...args: any[]) => ipcRenderer.invoke("changeSettings", ...args),
  onStateUpdate: (somfunc = () => null) => ipcRenderer.on("stateUpdate", somfunc),

  getPersistentStore: async () => ipcRenderer.invoke("getPersistentStore"),
  changePersistentStore: (...args: any[]) =>
    ipcRenderer.invoke("changePersistentStore", ...args),
  onPersistentStoreUpdate: (somfunc = () => null) =>
    ipcRenderer.on("persistentStoreUpdate", somfunc),
};

contextBridge.exposeInMainWorld("electron", electronApi);
