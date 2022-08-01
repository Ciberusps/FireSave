import {
  STEAM_LANGUGE_TO_CODES_MAP,
  TSteamLanguage,
  TSteamLanguageCode,
} from "./steamLangCodesMap";

// To add language here first check that STEAM_LANGUGE_TO_CODES_MAP codes format is `xx-XX`
export const LANGUAGES_WHITELIST: TSteamLanguage[] = [
  "english",
  "russian",
  "schinese",
  "french",
  "german",
  "italian",
  "japanese",
  "koreana",
  "polish",
  "brazilian",
  "spanish",
  "ukrainian",
];

// TODO: de -> de-DE
export const LANGUAGES_CODES_WHITELIST: TSteamLanguageCode[] = (
  Object.keys(STEAM_LANGUGE_TO_CODES_MAP) as TSteamLanguage[]
)
  .filter((l) => LANGUAGES_WHITELIST.includes(l))
  .map((l) => STEAM_LANGUGE_TO_CODES_MAP[l]);

export type TSupportedLanguageCodes = keyof typeof LANGUAGES_CODES_WHITELIST;
