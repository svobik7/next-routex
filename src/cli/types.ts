export type CliParams = {
  locales: string[]
  defaultLocale: string
  localizedDir: string
  originDir: string
}

export type Config = {
  locales: string[]
  defaultLocale: string
  getLocalizedAbsolutePath: (fileName?: string) => string
  getOriginAbsolutePath: (fileName?: string) => string
  getDistAbsolutePath: (fileName?: string) => string
  getCacheAbsolutePath: (fileName?: string) => string
  getOriginContents: (fileName: string) => string
}

export type Origin = {
  path: string
  localizations: OriginLocalization[]
}

export type OriginLocalization = {
  locale: string
  path: string
}

export type Rewrite = {
  originPath: string
  localizedPath: string
}

export type Root = {
  path: string
  translations: RootTranslation[]
}

export type RootTranslation = {
  locale: string
  path: string
}
