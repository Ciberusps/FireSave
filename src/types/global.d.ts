interface Window {
  electron: IPC.TApi;
}

type TPersistentStore = {
  settingsStorePath: string;
  gamesStorePath: string;
};

type TWindowSettings = {
  x: number;
  y: number;
  width: number;
  height: number;
  isMaximized: boolean;
};

type TSettingsStore = {
  isAutoSaveOn: boolean;
  autoSaveMinutes: number;
  version: string;
  saveShortcut: string;
  mainWindow: TWindowSettings;
  runtimeValues: {
    isLoadingApp: boolean;
  };
  selectedDisplay: Electron.Display | undefined;
  envs: {
    // TODO: not platform specific should be OS specific, migration required
    PLATFORM: NodeJS.Platform;
    RESOURCES_PATH: string;
    IS_DEV: boolean;
    IS_STEAMWORKS_AVAILABLE: boolean;
  };
};

type TGamesStore = {
  games: {
    [gameId: string]: TGame;
  };

  savePoints: {
    [gameId: string]: {
      [savePointId: string]: TSavePoint;
    };
  };
};

type TFolderOrFilesRaw = {
  path: string;
  files: string[];
};

type TPlatformSpecific<T> = Partial<{ [key in NodeJS.Platform]: T }>;
