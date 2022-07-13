import { OpenDialogOptions } from "electron";

declare global {
  namespace IPC {
    type TGetQuotaRes = {
      totalMB: number;
      availableMB: number;
    };

    type TCreateCustomGamePayload = {
      gamePath: TFolderOrFilesRaw;
      savesConfig: TSavesConfig;
    };

    type TEditGamePayload = Partial<TGame>;

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
      createCustomGame: (payload: TCreateCustomGamePayload) => Promise<void>;
      editGame: (gameId: string, payload: TEditGamePayload) => Promise<boolean>;
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
        revealInFileExplorer: (val: string) => Promise<void>;
        analyticsPageView: (url: string) => Promise<void>;
        openDialog: (
          options: OpenDialogOptions
        ) => Promise<TFolderOrFilesRaw | null>;
        getDisplays: () => Promise<Electron.Display[]>;

        i18nextElectronBackend: any;
      };

    type THandler<T extends keyof IPC.TApi = keyof IPC.TApi> = (
      event: Electron.IpcMainInvokeEvent,
      ...args: Parameters<IPC.TApi[T]>
    ) => ReturnType<IPC.TApi[T]>;
  }
}
