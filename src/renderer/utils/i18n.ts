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
        ipcRenderer: window.api.i18nextElectronBackend,
      },
      ns: "translation",
      lng,
      fallbackLng: "en",
      supportedLngs: LANGUAGES_CODES_WHITELIST,
    });
};

// // @ts-ignore
// window.api.i18nextElectronBackend.onLanguageChange((args) => {
//   console.log("i18nextElectronBackend.onLanguageChange");
//   console.log(args.lng);

//   i18n.changeLanguage(args.lng, (error, t) => {
//     console.log("i18nextElectronBackend.onLanguageChange", args.lng);
//     if (error) {
//       console.error(error);
//     }
//   });
// });

export default i18n;
export { setupI18n };
