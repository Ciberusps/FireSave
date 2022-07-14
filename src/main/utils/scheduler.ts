import Stores from "../stores";
import Games from "./games";
import Saves from "./saves";

const RUNNING_GAME_CHECK_INTERVAL = 15 * 1000; // 15 sec

let autoSavesTask: NodeJS.Timer | null = null;
let runningGamesCheckTask: NodeJS.Timer | null = null;

const foolCheck = () => {
  const mins = Stores.Settings.store.autoSaveMinutes;
  if (typeof mins !== "number" || mins < 1 || mins > 60) {
    Stores.Settings.set("autoSaveMinutes", 15);
  }
};

const runAutoSaves = () => {
  try {
    if (autoSavesTask) {
      clearInterval(autoSavesTask);
    }

    if (Stores.Settings.store.isAutoSaveOn) {
      foolCheck();
      console.info(
        `[saves.ts/runAutoSaves()] AutoSaves enabled, start or restart scheduler`
      );

      autoSavesTask = setInterval(() => {
        Saves.tryAutoSave();
      }, Stores.Settings.store.autoSaveMinutes * 60 * 1000);
    } else {
      console.info(
        `[saves.ts/runAutoSaves()] AutoSaves disabled, scheduler wont start`
      );
    }
  } catch (error) {
    // TODO: error report
    console.error(error);
  }
};

const runRunningGamesCheck = () => {
  if (runningGamesCheckTask) {
    clearInterval(runningGamesCheckTask);
  }

  Games.updateRunningGames();
  runningGamesCheckTask = setInterval(() => {
    Games.updateRunningGames();
  }, RUNNING_GAME_CHECK_INTERVAL);
};

const start = () => {
  runAutoSaves();
  runRunningGamesCheck();
};

const Scheduler = {
  start,
};

export default Scheduler;
