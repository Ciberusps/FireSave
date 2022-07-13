import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-electron-fs-backend";

import { LANGUAGES_CODES_WHITELIST } from "../../common/languagesWhiteList";

// On Mac, the folder for resources isn't
// in the same directory as Linux/Windows;
// https://www.electron.build/configuration/contents#extrafiles
const isMac =
  window.api.i18nextElectronBackend.clientOptions.platform === "darwin";
const isDev =
  window.api.i18nextElectronBackend.clientOptions.environment === "development";
const prependPath =
  isMac && !isDev
    ? window.api.i18nextElectronBackend.clientOptions.resourcesPath
    : ".";

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: prependPath + "/locales/{{lng}}/{{ns}}.json",
      ipcRenderer: window.api.i18nextElectronBackend,
    },
    ns: "translation",
    fallbackLng: "en",
    supportedLngs: LANGUAGES_CODES_WHITELIST,
  });

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
