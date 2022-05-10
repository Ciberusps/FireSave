import { OpenDialogOptions } from "electron";

declare global {
  namespace IPC {
    type TGetQuotaRes = {
      totalMB: number;
      availableMB: number;
    };

    type TCreateGamePayload = {
      gamePath: TFolderOrFilesPlatformSpecific;
      saveFilesOrFolder: TFolderOrFilesPlatformSpecific;
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
      createGame: (payload: TCreateGamePayload) => Promise<boolean>;
      editGame: (gameId: string, payload: TEditGamePayload) => Promise<boolean>;
      removeGame: (id: string) => Promise<boolean>;
    };

    type TSavesApi = {
      makeSave: (gameId: string) => Promise<void>;
      loadSave: (gameId: string, saveId: string) => Promise<boolean>;
      removeSave: (gameId: string, saveId: string) => Promise<void>;
    };

    type TApi = TStoresApi &
      TGamesApi &
      TSavesApi & {
        getQuota: () => Promise<TGetQuotaRes>;

        test: () => void;

        getGlobby: (options: TGetGlobbyOptions) => Promise<any>;

        revealInFileExplorer: (val: string) => Promise<void>;

        analyticsPageView: (url: string) => Promise<void>;
        openDialog: (
          options: OpenDialogOptions
        ) => Promise<TFolderOrFilesRaw | null>;
      };

    type THandler<T extends keyof IPC.TApi = keyof IPC.TApi> = (
      event: Electron.IpcMainInvokeEvent,
      ...args: Parameters<IPC.TApi[T]>
    ) => ReturnType<IPC.TApi[T]>;
  }
}
