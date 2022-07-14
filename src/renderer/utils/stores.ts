import create from "zustand";

export const usePersistentStore = create<TPersistentStore>(() => ({
  gamesStorePath: "",
  settingsStorePath: "",
  savesFolder: "",
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
  selectedDisplay: undefined,
  isStartingInTray: false,
  language: "en",

  runtimeValues: {
    IS_MAIN_LOADING: true,
  },
  // TODO: возможно все таки это плохая идея ENV'ы так долго грузить
  envs: {
    PLATFORM: "win32",
    RESOURCES_PATH: "",
    IS_DEV: false,
    IS_STEAMWORKS_AVAILABLE: false,
  },
}));

export const useGamesStore = create<TGamesStore>(() => ({
  games: {},
  savePoints: {},
  tags: [],
}));

export const loadStores = async () => {
  const persistentStore = await window.api.getPersistentStore();
  const settingsStore = await window.api.getSettingsStore();
  const gamesStore = await window.api.getGamesStore();
  usePersistentStore.setState(persistentStore);
  useSettingsStore.setState(settingsStore);
  useGamesStore.setState(gamesStore);
  return { persistentStore, settingsStore, gamesStore };
};

export const subscribeOnStoresChanges = async () => {
  window.api.onPersistentStoreUpdate((_, newStore) => {
    usePersistentStore.setState(newStore);
  });
  window.api.onSettingsStoreUpdate((_, newStore) => {
    useSettingsStore.setState(newStore);
  });
  window.api.onGamesStoreUpdate((_, newStore) => {
    useGamesStore.setState(newStore);
  });
};
