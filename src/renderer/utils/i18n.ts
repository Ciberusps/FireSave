import path from "path";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-electron-fs-backend";

import { LANGUAGES_CODES_WHITELIST } from "../../common/languagesWhiteList";

const setupI18n = (resourcesPath: string, lng: string) => {
  i18n
    .use(backend)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: path.join(resourcesPath, "/locales/{{lng}}/{{ns}}.json"),
        contextBridgeApiKey: "api",
      },
      ns: "translation",
      lng,
      fallbackLng: "en",
      supportedLngs: LANGUAGES_CODES_WHITELIST,
    });
};

export default i18n;
export { setupI18n };
