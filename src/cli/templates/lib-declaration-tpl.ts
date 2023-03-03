import type { Key } from 'path-to-regexp'
import { pathToRegexp } from 'path-to-regexp'
import type { Route, RouterSchema } from '~/types'
import type { CompileParams } from './tpl-utils'
import { compileTemplateFactory, getPatternsFromNames } from './tpl-utils'

export const PATTERNS = getPatternsFromNames(
  'routeLocales',
  'routeNamesStatic',
  'routeNamesDynamic',
  'routeParamsDynamic'
)

export const tpl = `
export type RouteLocale = ${PATTERNS.routeLocales};
export type RouteNameStatic = ${PATTERNS.routeNamesStatic};
export type RouteNameDynamic = ${PATTERNS.routeNamesDynamic};
export type RouteName = RouteNameStatic | RouteNameDynamic;
export type Route = { name: RouteName; href: \`/\${string}\` };
export type Schema = { defaultLocale: string, locales: string[], routes: Record<RouteLocale, Route[]> };

export type RouteParamsStatic<T extends object = object> = T & { locale?: RouteLocale };
export type RouteParamsDynamic<T extends RouteName> = ${PATTERNS.routeParamsDynamic};

export class Router {
  constructor(schema: Schema)
  
  getHref<T extends RouteNameDynamic>(name: T, params: RouteParamsDynamic<T>): string
  getHref<T extends RouteNameStatic>(name: T): string
  getHref<T extends RouteNameStatic>(name: T, params: RouteParamsStatic): string

  getLocaleFromHref(href: string): string
  getRouteFromHref(href: string): Route | undefined
}

export function compileHref(href: string, params: Record<string, string>): string
export function formatHref(href: string, params: Record<string, string>): string

export const schema: Schema;
`

function not<T>(fn: (input: T) => boolean) {
  return (input: T) => !fn(input)
}

function pipeString(value: string, index: number, array: string[]) {
  let output = `'${value}'`

  if (index < array.length - 1) {
    output += ' | '
  }

  return output
}

function formatPipedStrings(values: string[]) {
  return values.map(pipeString).join('')
}

function getRouteName(route: Route) {
  return route.name
}

function isDynamicRoute(route: Route) {
  return !!route.name.match(/\[\w+\]/g)
}

function getDefaultRoutes(schema: RouterSchema) {
  return schema.routes[schema.defaultLocale] || []
}
function getStaticRouteNames(schema: RouterSchema): string[] {
  const defaultRoutes = getDefaultRoutes(schema)
  return defaultRoutes?.filter(not(isDynamicRoute)).map(getRouteName)
}

function getDynamicRouteNames(schema: RouterSchema): string[] {
  const defaultRoutes = getDefaultRoutes(schema)
  return defaultRoutes?.filter(isDynamicRoute).map(getRouteName)
}

function getDynamicRouteParams(schema: RouterSchema) {
  const defaultRoutes = getDefaultRoutes(schema)
  const dynamicRoutes = defaultRoutes?.filter(isDynamicRoute)

  return dynamicRoutes.reduce(
    (acc: string, item: Route, index: number, array: Route[]) => {
      const params: Key[] = []
      pathToRegexp(item.href, params)

      acc += `T extends '${item.name}' ? RouteParamsStatic<{${params.map(
        (p) => `${p.name}:string`
      )}}> : `

      if (index === array.length - 1) {
        acc += 'RouteParamsStatic'
      }

      return acc
    },
    ''
  )
}

function getCompileParams(
  schema: RouterSchema
): CompileParams<typeof PATTERNS> {
  return {
    routeLocales: formatPipedStrings(schema.locales),
    routeNamesDynamic: formatPipedStrings(getDynamicRouteNames(schema)),
    routeNamesStatic: formatPipedStrings(getStaticRouteNames(schema)),
    routeParamsDynamic: getDynamicRouteParams(schema),
  }
}

export function compile(schema: RouterSchema) {
  const params = getCompileParams(schema)

  const compileTemplate = compileTemplateFactory()
  return compileTemplate(tpl, params)
}
