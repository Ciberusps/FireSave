import { IAppManifest, ISteamApp } from "@ciberus/find-steam-app";

declare global {
  type TGame = {
    id: string;

    // если нет пути до сейва, если нет пути до игры
    isValid: boolean;

    // scheduler пусть заполняет эту поеботу раз в N минут
    isPlaingNow: boolean;

    // если была создана при поиске steam'овских игр
    isCreatedAutomatically: boolean;

    savePointsFolderName: string;

    // статистика по сейвам, только инкрементится
    savesStats: {
      total: number;
      auto: number;
      manual: number;
    };

    imageUrl?: string;

    // TODO: mb add tags from storeInfo and sort by it
    tags?: string;

    // если игра steam'овская, то недавать возможности изменить path
    steam?: {
      appId: number;

      storeInfo?: TSteamAppStoreInfo;

      // чет неуверен что нужно манифест хранить его можно
      // в любой момент узнать и там нет интересной инфы
      // manifest: TPlatformSpecific<IAppManifest>;
    };

    // если нестимовская игра может меняться игроком
    name?: string;

    // мне прям путь до exeшника неособо нужен
    gamePath?: TFolderOrFiles;

    // путь до сейва игра, может быть папкой или набором файлов
    saveFilesOrFolder?: TFolderOrFiles;

    //
  };

  // TODO: rename "manual" | "auto"
  type TSavePointType = "manualsave" | "autosave";

  type TSavePoint = {
    id: string;

    // generated
    name: string;
    date: string;

    // should be folder not path
    // saves can be file(s) or folder, use folder for every save
    path: string;

    type?: TSavePointType;
    saveNumber?: number;
    saveNumberByType?: number;

    tags?: string[];
    screenshot?: string;
  };
}
