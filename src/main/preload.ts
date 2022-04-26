import { ipcRenderer, contextBridge } from "electron";

const api: IPC.TApi = {
  getQuota: async () => ipcRenderer.invoke("getQuota"),
  getConfig: async () => ipcRenderer.invoke("getConfig"),

  revealInFileExplorer: async (val) =>
    ipcRenderer.invoke("revealInFileExplorer", val),

  saveGame: async (val) => ipcRenderer.invoke("saveGame", val),
  loadSavePoint: async (...args) =>
    ipcRenderer.invoke("loadSavePoint", ...args),
  removeSavePoint: async (...args) =>
    ipcRenderer.invoke("removeSavePoint", ...args),

  createGame: (...args) => ipcRenderer.invoke("createGame", ...args),
  editGame: (...args) => ipcRenderer.invoke("editGame", ...args),
  removeGame: (...args) => ipcRenderer.invoke("removeGame", ...args),

  analyticsPageView: async (...args) =>
    ipcRenderer.invoke("analyticsPageView", ...args),
  openDialog: async (...args) => ipcRenderer.invoke("openDialog", ...args),

  getSettingsStore: async () => ipcRenderer.invoke("getSettingsStore"),
  changeSettings: (...args) => ipcRenderer.invoke("changeSettings", ...args),
  onSettingsStoreUpdate: (...args) =>
    ipcRenderer.on("settingsStoreUpdate", ...args),

  getPersistentStore: async () => ipcRenderer.invoke("getPersistentStore"),
  changePersistentStore: async (...args) =>
    ipcRenderer.invoke("changePersistentStore", ...args),
  onPersistentStoreUpdate: (...args) =>
    ipcRenderer.on("persistentStoreUpdate", ...args),
};

contextBridge.exposeInMainWorld("electron", api);
