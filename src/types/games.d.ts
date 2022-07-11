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
    gamePath?: TPlatformSpecific<TFolderOrFilesRaw>;

    savesConfig?: TPlatformSpecific<TSavesConfig>;
  };

  type TSavesConfigType = "simple" | "advanced";

  type TSavesConfig = {
    type: TSavesConfigType;
    saveFolder: TFolderOrFilesRaw; // only folder
    saveFullFolder: boolean; // includeAllFilesInFolder: boolean;
    includeList: string[]; // files or file types
    excludeList: string[];
    source?: "pcGamingWiki";
  };

  type TSaveType = "manual" | "auto";

  type TSavePoint = {
    id: string;

    // generated
    name: string;
    date: string;

    folderName: string;

    type: TSaveType;
    saveNumber: number;
    saveNumberByType: number;

    tags: string[];

    screenshotFileName?: string;

    isFavorite?: boolean;
  };
}
