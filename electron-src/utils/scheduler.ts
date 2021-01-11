import Store from "./store";
import Saves from "./saves";

// let autoSavesTask: ScheduledTask | null = null;
let autoSavesTask: NodeJS.Timer | null = null;

// const getCronExpression = (minutes: number): string | null => {
//   let result = `* ${minutes} * * * *`;
//   if (minutes === 60) result = `* 0 * * * *`;

//   const isValid = cron.validate(result);
//   if (isValid) {
//     return result;
//   } else {
//     return null;
//   }
// };

const foolCheck = () => {
  const mins = Store.store.autoSaveMinutes;
  if (typeof mins !== "number" || mins < 1 || mins > 60) {
    Store.set("autoSaveMinutes", 15);
  }
};

const runAutoSaves = () => {
  try {
    if (autoSavesTask) {
      console.log("DESTROY");
      // autoSavesTask.destroy();
      clearInterval(autoSavesTask);
    }

    if (Store.store.isAutoSaveOn) {
      foolCheck();
      console.info("AutoSaves enabled, start or restart scheduler");

      // const cronExpression = getCronExpression(Store.store.autoSaveMinutes);
      // if (!cronExpression) throw new Error("Failed to parse cron expression");

      // console.log(cronExpression);

      // autoSavesTask = cron.schedule(cronExpression, () => {
      //   console.log("running a task every minute");
      // });

      autoSavesTask = setInterval(() => {
        console.log("running a task every minute");
        Saves.tryAutoSave();
      }, Store.store.autoSaveMinutes * 60 * 1000);
    } else {
      console.info("AutoSaves disabled, scheduler wont start");
    }
  } catch (error) {
    // TODO: error report
    console.error(error);
  }
};

const Scheduler = {
  runAutoSaves,
};

export default Scheduler;
