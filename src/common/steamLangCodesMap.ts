// codes format should be `xx-XX`
// if its not fill up using Crowdin codes https://crowdin.com/project/firesave
export const STEAM_LANGUGE_TO_CODES_MAP = {
  arabic: "ar",
  bulgarian: "bg",
  schinese: "zh-CN",
  tchinese: "zh-TW",
  czech: "cs",
  danish: "da",
  dutch: "nl",
  english: "en",
  finnish: "fi",
  french: "fr-FR",
  german: "de",
  greek: "el",
  hungarian: "hu",
  italian: "it-IT",
  japanese: "ja-JP",
  koreana: "ko-KR",
  norwegian: "no",
  polish: "pl-PL",
  portuguese: "pt",
  brazilian: "pt-BR",
  romanian: "ro",
  russian: "ru-RU",
  spanish: "es-ES",
  latam: "es-419",
  swedish: "sv",
  thai: "th",
  turkish: "tr",
  ukrainian: "uk-UA",
  vietnamese: "vn",
} as const;

export type TSteamLanguage = keyof typeof STEAM_LANGUGE_TO_CODES_MAP;
export type TSteamLanguageCode =
  typeof STEAM_LANGUGE_TO_CODES_MAP[keyof typeof STEAM_LANGUGE_TO_CODES_MAP];
