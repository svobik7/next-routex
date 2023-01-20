import { Route, RouteRewrite, RouteVariant } from '../../types'
import { isParentRoute, isShadowRoute } from '../../utils'

function createPath(...segments: string[]) {
  const path = `/${segments.join('/')}`
  return path.replace(/\/\/+/g, '/')
}

type CreateRuleOptions = {
  depth: number
  route: Route
  variant: RouteVariant
  parentRewrite?: RouteRewrite
}

function createRule({
  depth,
  route,
  variant,
  parentRewrite,
}: CreateRuleOptions): RouteRewrite {
  return {
    ...variant,
    path: createPath(
      parentRewrite ? parentRewrite.path : variant.locale,
      route.path
    ),
    href: createPath(
      parentRewrite ? parentRewrite.href : variant.locale,
      variant.href
    ),
    depth,
  }
}

type GetRewriteFactory = {
  depth: number
  route: Route
  parentRewrites?: RouteRewrite[]
}

function getRewriteFactory({
  depth,
  route,
  parentRewrites,
}: GetRewriteFactory) {
  return (variant: RouteVariant): RouteRewrite => {
    const parentLocaleRewrite = parentRewrites?.find(
      (pr) => pr.locale === variant.locale
    )

    if (parentLocaleRewrite) {
      return createRule({
        depth,
        route,
        variant,
        parentRewrite: parentLocaleRewrite,
      })
    }

    return createRule({ depth, route, variant })
  }
}

type GetVariantsFactoryOptions = {
  locales: string[]
}

function getVariantsFactory({ locales }: GetVariantsFactoryOptions) {
  return (route: Route): RouteVariant[] => {
    const pickOrCreateVariant = (locale: string) => {
      const existingVariant = route.variants?.find((v) => v.locale === locale)
      return existingVariant || { locale, href: route.path }
    }
    return locales.map(pickOrCreateVariant)
  }
}

type GetRoutesRewritesOptions = {
  routes: Route[]
  locales: string[]
  parentRewrites?: RouteRewrite[]
  depth?: number
}

export function getRoutesRewrites({
  routes,
  locales,
  parentRewrites = [],
  depth = 0,
}: GetRoutesRewritesOptions): RouteRewrite[] {
  const getAllVariants = getVariantsFactory({ locales })

  return routes.reduce((acc, route) => {
    const routeRewrites: RouteRewrite[] = []
    const allVariants = getAllVariants(route)

    if (allVariants) {
      const rewriteParent = getRewriteFactory({
        route,
        depth,
        parentRewrites,
      })

      routeRewrites.push(...allVariants.map(rewriteParent))
    }

    if (!isShadowRoute(route)) {
      acc = [...acc, ...routeRewrites]
    }

    if (isParentRoute(route)) {
      acc = [
        ...acc,
        ...getRoutesRewrites({
          routes: route.children,
          locales,
          parentRewrites: routeRewrites,
          depth: depth + 1,
        }),
      ]
    }

    return acc
  }, [] as RouteRewrite[])
}
