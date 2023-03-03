import { RouteLocale, Router, schema } from 'next-roots'

export const router = new Router(schema)

export function getHrefFactory(locale: RouteLocale): typeof router.getHref {
  return (name: any, params: Record<string, string> = {}) =>
    router.getHref(name, { locale, ...params })
}
