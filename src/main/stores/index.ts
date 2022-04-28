import gamesStore from "./games";
import persistentStore from "./persistent";
import settingsStore from "./settings";

const Stores = {
  // persistent store - store that located in the app folder
  // should be synced with steam cloud or cdn
  Persistent: persistentStore,
  // other stores - stores that located in the "saves" folder
  // "saves" folder should be synced with steam cloud or cdn
  Settings: settingsStore,
  Games: gamesStore,
  // TODO: cacheStore
};

export default Stores;
