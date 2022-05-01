import { ipcRenderer, contextBridge } from "electron";

const storesApi: IPC.TStoresApi = {
  getPersistentStore: async () => ipcRenderer.invoke("getPersistentStore"),
  changePersistentStore: async (...args) =>
    ipcRenderer.invoke("changePersistentStore", ...args),
  onPersistentStoreUpdate: (...args) =>
    ipcRenderer.on("onPersistentStoreUpdate", ...args),

  getSettingsStore: async () => ipcRenderer.invoke("getSettingsStore"),
  changeSettings: (...args) => ipcRenderer.invoke("changeSettings", ...args),
  onSettingsStoreUpdate: (...args) =>
    ipcRenderer.on("onSettingsStoreUpdate", ...args),

  getGamesStore: async () => ipcRenderer.invoke("getGamesStore"),
  changeGamesStore: (...args) =>
    ipcRenderer.invoke("changeGamesStore", ...args),
  onGamesStoreUpdate: (...args) =>
    ipcRenderer.on("onGamesStoreUpdate", ...args),
};

const api: IPC.TApi = {
  getQuota: async () => ipcRenderer.invoke("getQuota"),

  test: async () => ipcRenderer.invoke("test"),

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

  ...storesApi,
};

contextBridge.exposeInMainWorld("electron", api);
