import path from "path";
import i18n from "i18next";
import backend from "i18next-fs-backend";

import { LANGUAGES_CODES_WHITELIST } from "../../common/languagesWhiteList";
import { RESOURCES_PATH } from "./config";

// On Mac, the folder for resources isn't
// in the same directory as Linux/Windows;
// https://www.electron.build/configuration/contents#extrafiles
const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV === "development";
const prependPath =
  isMac && !isDev ? path.join(process.resourcesPath, "..") : ".";

const localesPath = path.join(RESOURCES_PATH, "/locales/{{lng}}/{{ns}}.json");
console.log("LOCALES PATH", { RESOURCES_PATH, localesPath });

i18n.use(backend).init({
  backend: {
    loadPath: localesPath,
  },
  ns: "translation",
  lng: "en",
  fallbackLng: "en",
  supportedLngs: LANGUAGES_CODES_WHITELIST,
});

export default i18n;
