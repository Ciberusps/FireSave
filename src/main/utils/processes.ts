import { promisify } from "util";
import wmi, { TProccess } from "node-wmi";

import { PLATFORM } from "./config";
import { joinAndNormalize } from ".";

const wmiRes = promisify(wmi.Query);

type TProcess = {
  path: string;
};

const getProcessesList = async () => {
  const result: TProcess[] = [];

  if (process.platform === "win32") {
    const processes = (await wmiRes({ class: "Win32_Process" })) as TProccess[];

    processes.forEach((p) => {
      if (!p?.ExecutablePath) return undefined;
      return result.push({ path: joinAndNormalize(p.ExecutablePath) });
    });
  } else {
    throw new Error(
      `[getProcessesList] Not implemented for platform ${PLATFORM}`
    );
  }

  return result;
};

const Processes = {
  getProcessesList,
};

export default Processes;
