type TGetGameImageOptions = {
  game: TGame;
  steamStoreInfo?: TSteamAppStoreInfo;
};
export const getGameImage = (
  options: TGetGameImageOptions
): string | undefined => {
  if (options.game.steamAppId) {
    return `https://cdn.akamai.steamstatic.com/steam/apps/${options.game.steamAppId}/header.jpg`;
    // return options?.steamStoreInfo?.header_image;
  }
  return undefined;
};
