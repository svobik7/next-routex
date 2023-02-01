import { compile, match } from 'path-to-regexp'
import type { Route, Schema } from '~/types'

type CompileHrefOptions = {
  locale: string
  routeHref: string
  params: Record<string, string>
}

type RouterOptions = {
  currentLocale?: string
}

export class Router {
  private schema: Schema
  private options: RouterOptions

  constructor(schema: Schema, options: RouterOptions = {}) {
    this.schema = schema
    this.options = options
  }

  public getCurrentLocale() {
    const currentLocale = this.options.currentLocale || ''

    return this.isValidLocale(currentLocale)
      ? currentLocale
      : this.getDefaultLocale()
  }

  public getDefaultLocale() {
    return Object.keys(this.schema).at(0) || ''
  }

  public getHref(name: string, params: Record<string, string> = {}): string {
    const { locale = this.getCurrentLocale(), ...hrefParams } = params
    const route = this.findRouteByLocaleAndName(locale, name)
    return route
      ? this.compileHref({ locale, routeHref: route.href, params: hrefParams })
      : ''
  }

  public getRoute(href: string): Route | undefined {
    const { locale, routeHref } = this.parseHref(href)
    return this.findRouteByLocaleAndHref(locale, routeHref)
  }

  private getRoutes(locale: string) {
    return locale in this.schema ? this.schema[locale] : []
  }

  private findRouteByLocaleAndName(locale: string, name: string) {
    return this.getRoutes(locale).find((route: Route) => route.name === name)
  }

  private findRouteByLocaleAndHref(locale: string, routeHref: string) {
    return this.getRoutes(locale).find((route: Route) => {
      const isMatch = match(route.href, { decode: decodeURIComponent })
      return isMatch(routeHref)
    })
  }

  private compileHref({ routeHref, locale, params }: CompileHrefOptions) {
    let compiledRouteHref = ''
    try {
      const toPath = compile(routeHref, { encode: encodeURIComponent })
      compiledRouteHref = toPath(params)
    } catch {
      compiledRouteHref = routeHref
    }

    return this.formatHref(...[locale, compiledRouteHref])
  }

  private parseHref(href: string) {
    const rootLessHref = href.startsWith('/') ? href.slice(1) : href
    const [locale, ...routeHrefSegments] = rootLessHref.split('/')

    if (locale in this.schema) {
      return { locale, routeHref: this.formatHref(...routeHrefSegments) }
    }

    return { locale: '', routeHref: this.formatHref(rootLessHref) }
  }

  private formatHref(...segments: string[]) {
    const href = segments.join('/').replace(/\/\/+/g, '/')
    return href.startsWith('/') ? href : `/${href}`
  }

  private isValidLocale(locale: string) {
    return Object.keys(this.schema).includes(locale)
  }
}
