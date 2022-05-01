import { OpenDialogOptions } from "electron";

declare global {
  namespace IPC {
    type TGetQuotaRes = {
      totalMB: number;
      availableMB: number;
    };

    type TOpenDialogRes = {
      path: string;
      files: string[] | null;
    } | null;

    type TCreateGamePayload = {
      gamePath: TFolderOrFiles;
      saveFilesOrFolder: TFolderOrFiles;
    };

    type TEditGamePayload = {
      game: TGame;
      exePath: TFolderOrFiles;
      saves: TFolderOrFiles;
    };

    type TGetStore<T> = () => Promise<T>;
    type TChangeStore<T> = (newStore: T) => Promise<boolean>;
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

    type TSavePointsApi = {
      saveGame: (gameId: string) => Promise<void>;
      loadSavePoint: (gameId: string, savePointId: string) => Promise<boolean>;
      removeSavePoint: (gameId: string, savePointId: string) => Promise<void>;
    };

    type TApi = TStoresApi &
      TGamesApi &
      TSavePointsApi & {
        getQuota: () => Promise<TGetQuotaRes>;

        test: () => void;

        revealInFileExplorer: (val: string) => Promise<void>;

        analyticsPageView: (url: string) => Promise<void>;
        openDialog: (options: OpenDialogOptions) => Promise<TOpenDialogRes>;
      };
  }
}
