import greenworks, { TDefaultErrorCallback } from "greenworks";

import { STEAM_APP_ID } from "./config";

const init = (): boolean => {
  const isInited = greenworks.init();
  if (isInited) return true;
  return false;
};

type TGetCloudQuota = { totalBytes: number; availableBytes: number };

const getCloudQuota = async () =>
  new Promise<TGetCloudQuota>((resolve, reject: TDefaultErrorCallback) =>
    greenworks.getCloudQuota(
      (...args) => resolve({ totalBytes: args[0], availableBytes: args[0] }),
      (args) => reject(args)
    )
  );

const getSteamId = () => greenworks.getSteamId();

const getAppInstallDir = () => greenworks.getAppInstallDir(STEAM_APP_ID);

const SteamworksSDK = {
  init,
  getCloudQuota,
  getSteamId,
  getAppInstallDir,
};

export default SteamworksSDK;
