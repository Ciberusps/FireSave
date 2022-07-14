import { IAppManifest, ISteamApp } from "@ciberus/find-steam-app";

declare global {
  type TGameDetectionType = "steam" | "manual";

  type TGame = {
    id: string;

    // should be changable in UI
    // if "steam" used, game will be detected using steam(find-steam-app)
    // if "custom" used, game wont try to auto-detect
    detectionType: TGameDetectionType;

    // если нет пути до сейва, если нет пути до игры
    isValid: boolean;
    isGamePathValid: boolean;
    isSaveConfigValid: boolean;

    isSettupedAtLeastOnce: boolean;

    // scheduler пусть заполняет эту поеботу раз в N минут
    isPlaingNow: boolean;

    savePointsFolderName: string;

    // статистика по сейвам, только инкрементится
    savesStats: {
      total: number;
      auto: number;
      manual: number;
    };

    /** @deprecated use Stores.Games.steamGamesStoreInfo for steam games */
    imageUrl?: string;

    // TODO: mb add tags from storeInfo and sort by it
    tags?: string;

    steamAppId?: number;

    // can be change by user
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
