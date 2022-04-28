import Stores from "../stores";
import Games from "./games";
import Saves from "./saves";

const RUNNING_GAME_CHECK_INTERVAL = 60 * 1000; // 1 min

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
      console.log("DESTROY");
      clearInterval(autoSavesTask);
    }

    if (Stores.Settings.store.isAutoSaveOn) {
      foolCheck();
      console.info("AutoSaves enabled, start or restart scheduler");

      autoSavesTask = setInterval(() => {
        console.log("running a task every minute");
        Saves.tryAutoSave();
      }, Stores.Settings.store.autoSaveMinutes * 60 * 1000);
    } else {
      console.info("AutoSaves disabled, scheduler wont start");
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
