import { OpenDialogOptions } from "electron";

declare global {
  namespace IPC {
    type THandlerResult<T = unknown> = {
      success: boolean;
      result?: T;
      message?: string;
    };

    type TPromiseHandlerResult<T = unknown> = Promise<THandlerResult<T>>;

    type TGetQuotaRes = {
      totalMB: number;
      availableMB: number;
    };

    type TCreateCustomGamePayload = {
      gamePath: TFolderOrFilesRaw;
      savesConfig: TSavesConfig;
    };

    type TEditGamePayload = Pick<
      TGame,
      "isAutoDetectionEnabled" | "autoDetectionMethod"
    > & {
      gamePath: TFolderOrFilesRaw;
      savesConfig: TSavesConfig;
    };

    type TGetGlobbyOptions = {
      path: string;
      includeList: string[];
      excludeList: string[];
      isAbsolutePaths?: boolean;
    };

    type TGetStore<T> = () => Promise<T>;
    type TChangeStore<T> = (newStore: Partial<T>) => Promise<boolean>;
    type TOnUpdateStore<T> = (
      event: (event: Electron.IpcRendererEvent, newStore: T) => void
    ) => void;

    type TStoresApi = {
      getPersistentStore: TGetStore<TPersistentStore>;
      changePersistentStore: TChangeStore<TPersistentStore>;
      onPersistentStoreUpdate: TOnUpdateStore<TPersistentStore>;

      getSettingsStore: TGetStore<TSettingsStore>;
      changeSettings: TChangeStore<TSettingsStore>;
      onSettingsStoreUpdate: TOnUpdateStore<TSettingsStore>;

      getGamesStore: TGetStore<TGamesStore>;
      changeGamesStore: TChangeStore<TGamesStore>;
      onGamesStoreUpdate: TOnUpdateStore<TGamesStore>;
    };

    type TGamesApi = {
      createCustomGame: (
        payload: TCreateCustomGamePayload
      ) => TPromiseHandlerResult;
      editGame: (
        gameId: string,
        payload: TEditGamePayload
      ) => TPromiseHandlerResult;
      removeGame: (id: string) => Promise<boolean>;
      runGame: (id: string) => Promise<void>;
    };

    type TSavePointsApi = {
      makeSavePoint: (gameId: string) => Promise<void>;
      loadSavePoint: (gameId: string, savePointId: string) => Promise<boolean>;
      removeSavePoint: (gameId: string, savePointId: string) => Promise<void>;
      changeSavePointTags: (
        gameId: string,
        savePointId: string,
        tags: string[]
      ) => Promise<void>;
      changeSavePointName: (
        gameId: string,
        savePointId: string,
        newName: string
      ) => Promise<void>;
      addToFavorite: (gameId: string, savePointId: string) => Promise<void>;
    };

    type TApi = TStoresApi &
      TGamesApi &
      TSavePointsApi & {
        getQuota: () => Promise<TGetQuotaRes>;
        test: () => void;
        getGlobby: (options: TGetGlobbyOptions) => Promise<any>;
        revealInFileExplorer: (val: string) => TPromiseHandlerResult;
        analyticsPageView: (url: string) => Promise<void>;
        openDialog: (
          options: OpenDialogOptions
        ) => TPromiseHandlerResult<TFolderOrFilesRaw>;
        getDisplays: () => Promise<Electron.Display[]>;

        // TODO: contribute typings to `i18next-electron-fs-backend` and add here
        i18nextElectronBackend: any;
      };

    type TApiWithExclusions = Omit<IPC.TApi, "i18nextElectronBackend">;

    type THandler<
      T extends keyof TApiWithExclusions = keyof TApiWithExclusions
    > = (
      event: Electron.IpcMainInvokeEvent,
      ...args: Parameters<IPC.TApi[T]>
    ) => ReturnType<IPC.TApi[T]>;
  }
}
