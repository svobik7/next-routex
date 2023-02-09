export type Config = {
  rootDir: string
  locales: string[]
  routes: ConfigRoute[]
}

export type ConfigRoute =
  | ConfigRouteParent
  | ConfigRouteChild
  | ConfigRouteGroup
  | ConfigRouteDynamic

export type ConfigRouteChild = {
  rootPath: string
  translations: ConfigRouteTranslation[]
}

export type ConfigRouteParent = ConfigRouteChild & {
  children: Array<ConfigRoute>
}

export type ConfigRouteGroup = Omit<ConfigRouteParent, 'translations'> & {
  rootPath: `(${string})`
}

export type ConfigRouteDynamic = Omit<
  ConfigRouteParent | ConfigRouteChild,
  'translations'
> & {
  rootPath: `[${string}]`
}

export type ConfigRouteTranslation = {
  locale: string
  segment: string
}

export type FileRoute = {
  rootPath: `/${string}`
  routePath: `/${string}`
}

export type FileRewrite = {
  source: `/${string}`
  from: `/${string}`
  to: `/${string}`
}
