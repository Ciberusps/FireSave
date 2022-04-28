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

type TFolderOrFiles = TPlatformSpecific<{
  path: string;
  files: string[];
}>;

type TPlatformSpecific<T> = Partial<{ [key in NodeJS.Platform]: T }>;

// TODO: rename "manual" | "auto"
type TSavePointType = "manualsave" | "autosave";

type TSavePoint = {
  id: string;
  name: string;
  date: string;
  path: string;
  type?: TSavePointType;
  number?: number;
  typeNumber?: number;
  tags?: string[];
  screenshot?: string;
};
