export type SiteLanguage = {
  code: string;
  name: string;
  isDefault: boolean;
  status: string;
};

export type I18nBootstrap = {
  languages: SiteLanguage[];
  currentLocale: string;
  isDefault: boolean;
  isActive: boolean;
  warning?: string;
};
