import path from "path";
import i18n from "i18next";
import backend from "i18next-fs-backend";

import { LANGUAGES_CODES_WHITELIST } from "../../common/languagesWhiteList";
import { RESOURCES_PATH } from "./config";

i18n.use(backend).init({
  backend: {
    loadPath: path.join(RESOURCES_PATH, "/locales/{{lng}}/{{ns}}.json"),
  },
  ns: "translation",
  lng: "en",
  fallbackLng: "en",
  supportedLngs: LANGUAGES_CODES_WHITELIST,
});

export default i18n;
