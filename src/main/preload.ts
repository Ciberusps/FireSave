import { ipcRenderer, contextBridge } from "electron";

const defaultInvokeFunction = (key: keyof IPC.TApi) => {
  return async (...args: any) => ipcRenderer.invoke(key, ...args);
};

const defaultOnFunction = (key: keyof IPC.TApi) => {
  // @ts-ignore
  return (...args: any) => ipcRenderer.on(key, ...args);
};

const storesApi: IPC.TStoresApi = {
  getPersistentStore: defaultInvokeFunction("getPersistentStore"),
  changePersistentStore: defaultInvokeFunction("changePersistentStore"),
  onPersistentStoreUpdate: defaultOnFunction("onPersistentStoreUpdate"),

  getSettingsStore: defaultInvokeFunction("getSettingsStore"),
  changeSettings: defaultInvokeFunction("changeSettings"),
  onSettingsStoreUpdate: defaultOnFunction("onSettingsStoreUpdate"),

  getGamesStore: defaultInvokeFunction("getGamesStore"),
  changeGamesStore: defaultInvokeFunction("changeGamesStore"),
  onGamesStoreUpdate: defaultOnFunction("onGamesStoreUpdate"),
};

const gamesApi: IPC.TGamesApi = {
  createCustomGame: defaultInvokeFunction("createCustomGame"),
  editGame: defaultInvokeFunction("editGame"),
  removeGame: defaultInvokeFunction("removeGame"),
  runGame: defaultInvokeFunction("runGame"),
};

const savePontsApi: IPC.TSavePointsApi = {
  makeSavePoint: defaultInvokeFunction("makeSavePoint"),
  loadSavePoint: defaultInvokeFunction("loadSavePoint"),
  removeSavePoint: defaultInvokeFunction("removeSavePoint"),
  changeSavePointTags: defaultInvokeFunction("changeSavePointTags"),
  changeSavePointName: defaultInvokeFunction("changeSavePointName"),
  addToFavorite: defaultInvokeFunction("addToFavorite"),
};

const api: IPC.TApi = {
  getQuota: defaultInvokeFunction("getQuota"),
  test: defaultInvokeFunction("test"),
  getGlobby: defaultInvokeFunction("getGlobby"),
  revealInFileExplorer: defaultInvokeFunction("revealInFileExplorer"),
  analyticsPageView: defaultInvokeFunction("analyticsPageView"),
  openDialog: defaultInvokeFunction("openDialog"),
  getDisplays: defaultInvokeFunction("getDisplays"),

  ...storesApi,
  ...gamesApi,
  ...savePontsApi,
};

contextBridge.exposeInMainWorld("electron", api);
