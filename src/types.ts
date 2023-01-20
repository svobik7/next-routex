export type Config = {
  locales: string[]
  defaultLocale: string
  appName: string
  routes: Route[]
}

export type ChildRoute = { path: string; variants: RouteVariant[] }
export type ParentRoute = ChildRoute & {
  children: Array<ParentRoute | ChildRoute>
}
export type ShadowRoute = ParentRoute & { isShadowRoute: true }

export type Route = ParentRoute | ChildRoute | ShadowRoute

export type RouteVariant = {
  locale: string
  href: string
}

export type RouteRewrite = {
  locale: string
  path: string
  href: string
  depth: number
}

export type FileRewrite = {
  source: string
  from: string
  to: string
}
