const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send("ipc-example", "ping");
    },
    on(channel, func) {
      const validChannels = ["ipc-example"];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ["ipc-example"];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },

  getQuota: () => ipcRenderer.invoke("getQuota"),

  getConfig: () => ipcRenderer.invoke("getConfig"),

  revealInFileExplorer: (val) =>
    ipcRenderer.invoke("revealInFileExplorer", val),

  saveGame: async (val) => ipcRenderer.invoke("saveGame", val),
  loadSavePoint: async (...args) =>
    ipcRenderer.invoke("loadSavePoint", ...args),
  removeSavePoint: async (...args) =>
    ipcRenderer.invoke("removeSavePoint", ...args),

  createGame: (...args) => ipcRenderer.invoke("createGame", ...args),
  editGame: (...args) => ipcRenderer.invoke("editGame", ...args),
  removeGame: (...args) => ipcRenderer.invoke("removeGame", ...args),

  analyticsPageView: (...args) =>
    ipcRenderer.invoke("analyticsPageView", ...args),
  openDialog: (...args) => ipcRenderer.invoke("openDialog", ...args),

  getSettingsStore: async () => ipcRenderer.invoke("getSettingsStore"),
  changeSettings: (...args) => ipcRenderer.invoke("changeSettings", ...args),
  onStateUpdate: (somfunc = () => null) =>
    ipcRenderer.on("stateUpdate", somfunc),

  getPersistentStore: async () => ipcRenderer.invoke("getPersistentStore"),
  changePersistentStore: (...args) =>
    ipcRenderer.invoke("changePersistentStore", ...args),
  onPersistentStoreUpdate: (somfunc = () => null) =>
    ipcRenderer.on("persistentStoreUpdate", somfunc),

  // TODO: stores
  // store: {
  //   get(val) {
  //     return ipcRenderer.sendSync('electron-store-get', val);
  //   },
  //   set(property, val) {
  //     ipcRenderer.send('electron-store-set', property, val);
  //   },
  //   // Other method you want to add like has(), reset(), etc.
  // },
  // Any other methods you want to expose in the window object.
  // ...
});
