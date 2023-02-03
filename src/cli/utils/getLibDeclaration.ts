import type { Key } from 'path-to-regexp';
import { pathToRegexp } from 'path-to-regexp'
import type { Route, Schema } from '~/types'

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

function getRouteName(route: Route) {
  return route.name
}

function isDynamicRoute(route: Route) {
  return !!route.name.match(/\[\w+\]/g)
}

function getRouteLocales(schema: Schema) {
  return Object.keys(schema)
}

function getRouteNamesStatic(schema: Schema): string[] {
  const [firstLocale] = Object.keys(schema)
  const firstRoutes = schema[firstLocale]
  return firstRoutes.filter(not(isDynamicRoute)).map(getRouteName)
}

function getRouteNamesDynamic(schema: Schema): string[] {
  const [firstLocale] = Object.keys(schema)
  const firstRoutes = schema[firstLocale]
  return firstRoutes.filter(isDynamicRoute).map(getRouteName)
}

function getRouteParamsDynamic(schema: Schema) {
  const [firstLocale] = Object.keys(schema)
  const firstRoutes = schema[firstLocale]
  const dynamicRoutes = firstRoutes.filter(isDynamicRoute)

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

function createPipeReplacement(getValues: (schema: Schema) => string[]) {
  return (schema: Schema) => {
    const values = getValues(schema)
    return values.map(pipeString).join('')
  }
}

const replacements = new Map([
  ['{{routeLocales}}', createPipeReplacement(getRouteLocales)],
  ['{{routeNamesStatic}}', createPipeReplacement(getRouteNamesStatic)],
  ['{{routeNamesDynamic}}', createPipeReplacement(getRouteNamesDynamic)],
  ['{{routeParamsDynamic}}', getRouteParamsDynamic],
])

const template = `
export type RouteLocale = {{routeLocales}}
export type RouteNameStatic = {{routeNamesStatic}}
export type RouteNameDynamic = {{routeNamesDynamic}}
export type RouteName = RouteNameStatic | RouteNameDynamic
export type Route = { name: RouteName; href: \`/\${string}\` }
export type Schema = { [P in RouteLocale]: Route[] }

export type RouteParamsStatic<T extends object = {}> = T & { locale?: RouteLocale }
export type RouteParamsDynamic<T extends RouteName> = {{routeParamsDynamic}}

export class Router {
  constructor(schema: Schema)
  
  getHref<T extends RouteNameDynamic>(name: T, params: RouteParamsDynamic<T>): string
  getHref<T extends RouteNameStatic>(name: T): string
  getHref<T extends RouteNameStatic>(name: T, params: RouteParamsStatic): string

  getRoute(href: string): Route | undefined
  
  getDefaultLocale(): string
  getLocale(): string
  setLocale(locale: string): string
}

export const schema: Schema
`

export function getLibDeclaration(schema: Schema): string {
  return template.replace(
    /\{\{(routeLocales|routeNamesStatic|routeNamesDynamic|routeParamsDynamic)\}\}/gi,
    (match: string) => replacements.get(match)?.(schema) || ''
  )
}
