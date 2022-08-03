import { TSupportedLanguageCodes } from "./languagesWhiteList";

export const LANGUAGE_CODE_TO_NAME_MAP: {
  [key in TSupportedLanguageCodes]?: string;
} = {
  en: "English",
  "ru-RU": "Русский",
  "de-DE": "Deutsch",
  "fr-FR": "Français",
  "uk-UA": "Українська",
  "pt-BR": "Português",
  "es-ES": "Español",
  "it-IT": "Italiano",
  "ja-JP": "日本語",
  "ko-KR": "한국어",
  "pl-PL": "Polski",
  "zh-CN": "简体中文",
};
