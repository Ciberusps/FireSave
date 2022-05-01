import create from "zustand";

export const usePersistentStore = create<TPersistentStore>(() => ({
  gamesStorePath: "",
  settingsStorePath: "",
}));

export const useSettingsStore = create<TSettingsStore>(() => ({
  autoSaveMinutes: 5,
  isAutoSaveOn: true,
  version: "",
  saveShortcut: "",
  mainWindow: {
    height: 5,
    width: 5,
    x: 5,
    y: 5,
    isMaximized: false,
  },
  runtimeValues: {
    isLoadingApp: true,
  },
  // TODO: возможно все таки это плохая идея ENV'ы так долго грузить
  envs: {
    PLATFORM: "",
    RESOURCES_PATH: "",
    IS_DEV: false,
  },
}));

export const useGamesStore = create<TGamesStore>(() => ({
  games: {},
  savePoints: {},
}));

export const loadStores = async () => {
  const persistentStore = await window.electron.getPersistentStore();
  const settingsStore = await window.electron.getSettingsStore();
  const gamesStore = await window.electron.getGamesStore();
  usePersistentStore.setState(persistentStore);
  useSettingsStore.setState(settingsStore);
  useGamesStore.setState(gamesStore);
};

export const subscribeOnStoresChanges = async () => {
  window.electron.onPersistentStoreUpdate((_, newStore) => {
    usePersistentStore.setState(newStore);
  });
  window.electron.onSettingsStoreUpdate((_, newStore) => {
    useSettingsStore.setState(newStore);
  });
  window.electron.onGamesStoreUpdate((_, newStore) => {
    console.log("games store updated", newStore);
    useGamesStore.setState(newStore);
  });
};
