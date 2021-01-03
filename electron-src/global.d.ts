type TStore = {
  isAutoSaveOn: boolean;
  autoSaveMinutes: number;
  storePath: string;
  games: { [key: string]: TGame };
};

type TGame = {
  id: string;
  name: string;
  steamAppId: string;
  exePath: string; // id
  saves: {
    path: string;
    files: string[];
  };
};
