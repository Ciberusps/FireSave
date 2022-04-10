declare module "greenworks" {
  type TGetCloudQuotaSuccessCallback = (
    total_bytes: number,
    available_bytes: number
  ) => void;
  type TDefaultErrorCallback = (error: any) => void;

  const greenworks: {
    init: () => boolean;
    getCloudQuota: (
      success_callback: TGetCloudQuotaSuccessCallback,
      error_callback: TDefaultErrorCallback
    ) => void;
    // TODO: steamId obj https://github.com/greenheartgames/greenworks/blob/master/docs/friends.md#steamid
    getSteamId: () => unknown;
    // TODO: https://github.com/greenheartgames/greenworks/blob/master/docs/setting.md#greenworksgetappinstalldirapp_id-buffer-buffer_size
    getAppInstallDir: (
      app_id: number,
      buffer?: any,
      buffer_size?: any
    ) => string;
  };

  export default greenworks;
  export { TGetCloudQuotaSuccessCallback, TDefaultErrorCallback };
}
