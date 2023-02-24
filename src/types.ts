export type Route = {
  name: `/${string}`
  href: `/${string}`
}

export type RouterSchema = {
  defaultLocale: string
  locales: string[]
  routes: Record<string, Route[]>
}
