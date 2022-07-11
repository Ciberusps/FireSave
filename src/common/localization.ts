import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../locales/en/translation.json";
import ru from "../../locales/ru/translation.json";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
} as const;

const init = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources,
      lng: "ru", // if you're using a language detector, do not define the lng option
      fallbackLng: "en",

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
};

const Localization = {
  init,
  t: i18n.t,
};

export default Localization;
