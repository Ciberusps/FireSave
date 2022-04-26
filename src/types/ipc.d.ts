import { OpenDialogOptions } from "electron";

declare global {
  namespace IPC {
    type TGetConfigRes = {
      RESOURCES_PATH: string;
      IS_DEV: boolean;
    };

    type TGetQuotaRes = {
      totalMB: number;
      availableMB: number;
    };

    type TSettings = {
      isAutoSaveOn: boolean;
      autoSaveMinutes: number;
    };

    type TOpenDialogRes = {
      path: string;
      files: string[] | null;
    } | null;

    type TCreateGamePayload = {
      exePath: TFolderOrFileOrMultipleFiles;
      saves: TFolderOrFileOrMultipleFiles;
    };

    type TEditGamePayload = {
      game: TGame;
      exePath: TFolderOrFileOrMultipleFiles;
      saves: TFolderOrFileOrMultipleFiles;
    };

    type TGetConfig = () => Promise<TGetConfigRes>;
    type TGetQuota = () => Promise<TGetQuotaRes>;

    type TRevealInFileExplorer = (val: string) => Promise<void>;

    type TSaveGame = (gameId: string) => Promise<void>;
    type TLoadSavePoint = (
      gameId: string,
      savePointId: string
    ) => Promise<boolean>;
    type TRemoveSavePoint = (
      gameId: string,
      savePointId: string
    ) => Promise<void>;

    type TCreateGame = (payload: TCreateGamePayload) => Promise<boolean>;
    type TEditGame = (payload: TEditGamePayload) => Promise<boolean>;
    type TRemoveGame = (id: string) => Promise<boolean>;

    type TAnalyticsPageView = (url: string) => Promise<void>;
    type TOpenDialog = (options: OpenDialogOptions) => Promise<TOpenDialogRes>;

    type TChangeSettings = (newSettings: TSettings) => Promise<boolean>;

    type TGetSettingsStore = () => Promise<TSettingsStore>;
    type TOnSettingsStoreUpdate = (
      event: (
        event: Electron.IpcRendererEvent,
        newStore: TSettingsStore
      ) => void
    ) => void;

    type TGetPersistentStore = () => Promise<TPersistentStore>;
    type TChangePersistentStore = (
      newSettings: TPersistentStore
    ) => Promise<boolean>;
    type TOnPersistentStoreUpdate = (
      event: (
        event: Electron.IpcRendererEvent,
        newStore: TPersistentStore
      ) => void
    ) => void;

    type TApi = {
      getConfig: TGetConfig;
      getQuota: TGetQuota;

      revealInFileExplorer: TRevealInFileExplorer;

      saveGame: TSaveGame;
      loadSavePoint: TLoadSavePoint;
      removeSavePoint: TRemoveSavePoint;

      createGame: TCreateGame;
      editGame: TEditGame;
      removeGame: TRemoveGame;

      analyticsPageView: TAnalyticsPageView;
      openDialog: TOpenDialog;

      changeSettings: TChangeSettings;
      getSettingsStore: TGetSettingsStore;
      onSettingsStoreUpdate: TOnSettingsStoreUpdate;

      getPersistentStore: TGetPersistentStore;
      changePersistentStore: TChangePersistentStore;
      onPersistentStoreUpdate: TOnPersistentStoreUpdate;
    };
  }
}
