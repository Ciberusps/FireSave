import { IpcRenderer, Remote } from "electron";

declare global {
  interface Window {
    electron: any;
  }

  type TStore = {
    isAutoSaveOn: boolean;
    autoSaveMinutes: number;
    storePath: string;
    version: string;
    saveShortcut: string;
    games: { [key: string]: TGame };
  };

  type TGame = {
    id: string;
    name: string;
    exePath: string; // id
    saves: TSaves;
    savePoints?: { [key: string]: TSavePoint };
    steamInfo?: TSteamInfo;
    steamManifest?: string;
    stats: {
      allSavesCount: number;
      autoSaveCount: number;
      manualSaveCount: number;
    };
  };

  type TSaves = {
    path: string;
    files: string[];
  };

  type TSavePointType = "manualsave" | "autosave";

  type TSavePoint = {
    id: string;
    name: string;
    date: string;
    path: string;
    type?: TSavePointType;
    number?: number;
    typeNumber?: number;
    tags?: string[];
    screenshot?: string;
  };

  // Steam manifest
  type TAppManifest = {
    AppState: {
      appid: string;
      Universe: string;
      name: string;
      StateFlags: string;
      installdir: string;
      LastUpdated: string;
      UpdateResult: string;
      SizeOnDisk: string;
      buildid: string;
      LastOwner: string;
      BytesToDownload: string;
      BytesDownloaded: string;
      BytesToStage: string;
      BytesStaged: string;
      AutoUpdateBehavior: string;
      AllowOtherDownloadsWhileRunning: string;
      ScheduledAutoUpdate: string;
      InstalledDepots: { [key: string]: TDepot };
      SharedDepots: { [key: string]: string };
      UserConfig: TUserConfig;
    };
  };

  // Steam info
  type TSteamInfo = {
    type: string;
    name: string;
    steam_appid: number;
    required_age: number;
    is_free: boolean;
    dlc: number[];
    detailed_description: string;
    about_the_game: string;
    short_description: string;
    supported_languages: string;
    reviews: string;
    header_image: string;
    website: string;
    pc_requirements: TRequirements;
    mac_requirements: TRequirements;
    linux_requirements: TRequirements;
    developers: string[];
    publishers: string[];
    packages: number[];
    package_groups: TPackageGroup[];
    platforms: TPlatforms;
    metacritic: TMetacritic;
    categories: TCategory[];
    genres: TGenre[];
    screenshots: TScreenshot[];
    movies: TMovie[];
    recommendations: TRecommendations;
    release_date: TReleaseDate;
    support_info: TSupportInfo;
    background: string;
    content_descriptors: TContentDescriptors;
  };
}

// Steam manifest
type TDepot = {
  manifest: string;
  size: string;
};

type TUserConfig = {
  language: string;
};

// Steam info
type TCategory = {
  id: number;
  description: string;
};

type TContentDescriptors = {
  ids: any[];
  notes: null;
};

type TGenre = {
  id: string;
  description: string;
};

type TRequirements = {
  minimum: string;
};

type TMetacritic = {
  score: number;
  url: string;
};

type TMovie = {
  id: number;
  name: string;
  thumbnail: string;
  webm: { [key: string]: string };
  mp4: { [key: string]: string };
  highlight: boolean;
};

type TPackageGroup = {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: Sub[];
};

type TSub = {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
};

type TPlatforms = {
  windows: boolean;
  mac: boolean;
  linux: boolean;
};

type TRecommendations = {
  total: number;
};

type TReleaseDate = {
  coming_soon: boolean;
  date: string;
};

type TScreenshot = {
  id: number;
  path_thumbnail: string;
  path_full: string;
};

type TSupportInfo = {
  url: string;
  email: string;
};
