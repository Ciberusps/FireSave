// Steam info
type TSteamAppStoreInfo = {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  reviews: string;
  header_image: string;
  website: string;
  pc_requirements: TRequirements;
  mac_requirements: TRequirements;
  linux_requirements: TRequirements;
  developers: string[];
  publishers: string[];
  packages: number[];
  package_groups: TPackageGroup[];
  platforms: TPlatforms;
  metacritic: TMetacritic;
  categories: TCategory[];
  genres: TGenre[];
  screenshots: TScreenshot[];
  movies: TMovie[];
  recommendations: TRecommendations;
  release_date: TReleaseDate;
  support_info: TSupportInfo;
  background: string;
  content_descriptors: TContentDescriptors;
};

type TCategory = {
  id: number;
  description: string;
};

type TContentDescriptors = {
  ids: any[];
  notes: null;
};

type TGenre = {
  id: string;
  description: string;
};

type TRequirements = {
  minimum: string;
};

type TMetacritic = {
  score: number;
  url: string;
};

type TMovie = {
  id: number;
  name: string;
  thumbnail: string;
  webm: { [key: string]: string };
  mp4: { [key: string]: string };
  highlight: boolean;
};

type TPackageGroup = {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: TSub[];
};

type TSub = {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
};

type TPlatforms = {
  windows: boolean;
  mac: boolean;
  linux: boolean;
};

type TRecommendations = {
  total: number;
};

type TReleaseDate = {
  coming_soon: boolean;
  date: string;
};

type TScreenshot = {
  id: number;
  path_thumbnail: string;
  path_full: string;
};

type TSupportInfo = {
  url: string;
  email: string;
};
