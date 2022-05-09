import { OpenDialogOptions } from "electron";

declare global {
  namespace IPC {
    type TGetQuotaRes = {
      totalMB: number;
      availableMB: number;
    };

    type TCreateGamePayload = {
      gamePath: TFolderOrFiles;
      saveFilesOrFolder: TFolderOrFiles;
    };

    type TEditGamePayload = {
      game: TGame;
      exePath: TFolderOrFiles;
      saves: TFolderOrFiles;
    };

    type TGetGlobbyOptions = {
      path: string;
      includeList: string[];
      excludeList: string[];
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
      editGame: (payload: TEditGamePayload) => Promise<boolean>;
      removeGame: (id: string) => Promise<boolean>;
    };

    type TSavesApi = {
      saveGame: (gameId: string) => Promise<void>;
      loadSavePoint: (gameId: string, savePointId: string) => Promise<boolean>;
      removeSavePoint: (gameId: string, savePointId: string) => Promise<void>;
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
