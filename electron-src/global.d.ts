type TStore = {
  isAutoSaveOn: boolean;
  autoSaveMinutes: number;
  storePath: string;
  games: TGame[];
};

type TGame = {
  name: string;
  steamAppId: string;
  exePath: string; // id
  saves: {
    path: string;
    files: string[];
  };
};
