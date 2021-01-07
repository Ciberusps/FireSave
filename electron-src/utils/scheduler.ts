import Saves from "./saves";
import Store from "./store";

const foolCheck = () => {
  const mins = Store.store.autoSaveMinutes;
  if (typeof mins !== "number" || mins < 1 || mins > 60) {
    Store.set("autoSaveMinutes", 15);
  }
};

const runAutoSaves = () => {
  if (Store.store.isAutoSaveOn) {
    foolCheck();
    console.info("AutoSaves enabled, start scheduler");
    Saves.tryAutoSave();

    // cron.schedule("* * * * *", () => {
    //   console.log("running a task every minute");
    // });

    // console.log("GAME ID", getGameId(Store.store.games[0].exePath));

    setInterval(() => {
      console.log("TRY AUTO SAVE");
      Saves.tryAutoSave();
    }, Store.store.autoSaveMinutes * 60 * 1000);
  } else {
    console.info("AutoSaves disabled, scheduler wont start");
  }
};

const Scheduler = {
  runAutoSaves,
};

export default Scheduler;
