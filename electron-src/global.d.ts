type TStore = {
  isAutoSaveOn: boolean;
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
