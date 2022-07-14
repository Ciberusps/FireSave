import axios from "axios";

type TFetchGamesStoreInfoRes = {
  result: { [steamAppId: string]: TSteamAppStoreInfo };
  isTimelimitExceeded: boolean;
};

export const fetchGamesStoreInfo = async (
  appIds: number[]
): Promise<TFetchGamesStoreInfoRes | null> => {
  console.info("[steamApi.ts/fetchGamesStoreInfo()]", { appIds });
  try {
    const searchParams = new URLSearchParams();
    appIds.forEach((appId) => searchParams.append("appid", appId.toString()));

    const res = (
      await axios.get<TFetchGamesStoreInfoRes>(
        `https://steam-api-cached.vercel.app/api/getAppsDetails?${searchParams.toString()}`
      )
    ).data;
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const SteamAPI = {
  fetchGamesStoreInfo,
};

export default SteamAPI;
