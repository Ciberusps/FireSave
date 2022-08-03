import { TSupportedLanguageCodes } from "common/languagesWhiteList";
import { TSteamLanguageCode } from "../common/steamLangCodesMap";
import { TLeaf } from "../main/utils/globTree";

declare global {
  interface Window {
    api: IPC.TApi;
  }

  type TPersistentStore = {
    savesFolder: string;
    /** @deprecated can be replaced with "savesFolder" without breaking changes */
    settingsStorePath?: string;
    /** @deprecated can be replaced with "savesFolder" without breaking changes */
    gamesStorePath?: string;
  };

  type TWindowSettings = {
    x: number;
    y: number;
    width: number;
    height: number;
    isMaximized: boolean;
  };

  type TLanguage = TSupportedLanguageCodes;

  type TSettingsStore = {
    isAutoSaveOn: boolean;
    autoSaveMinutes: number;
    version: string;
    saveShortcut: string;
    mainWindow: TWindowSettings;
    selectedDisplay: Electron.Display | undefined;
    isStartingInTray: boolean;
    language: TLanguage;

    runtimeValues: {
      IS_MAIN_LOADING: boolean;
    };
    envs: {
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
    steamGamesStoreInfo: {
      [steamAppId: string]: TSteamAppStoreInfo;
    };
    tags: string[];
  };

  type TFolderOrFilesRaw = {
    path: string;
    files: string[];
  };

  type TPlatformSpecific<T> = Partial<{ [key in NodeJS.Platform]: T }>;

  type TFilesTree = TLeaf[];
}
