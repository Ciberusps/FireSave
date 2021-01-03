import ElectronStore from "electron-store";

const Store = new ElectronStore<TStore>({
  defaults: {
    // TODO: add window position save https://github.com/mawie81/electron-window-state
    // window: {
    //     x: 0,
    //     y: 0,
    //     widht: 123,
    //     height: 123,
    // },
    // minimize: true
    isAutoSaveOn: true,
    storePath: "C:/GamesSaves",
    games: [],
  },
});

// let state: TState = {

//   games: [
//     // {
//     //   steamAppId: "",
//     //   exePath:
//     //     "G:/SteamLibrary/steamapps/common/Dark Souls II Scholar of the First Sin/Game/DarkSoulsII.exe",
//     //   savesPath: "C:/Users/Ciber/AppData/Roaming/DarkSoulsII/011000010969832b",
//     //   savesFiles: ["DS2SOFS0000.sl2"],
//     //   // savesPattern:
//     // },
//   ],
// };

export default Store;
