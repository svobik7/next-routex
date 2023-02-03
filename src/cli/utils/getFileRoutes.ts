import type { ConfigRule, ConfigRuleRoute, FileRoute } from '~/cli/types'
import { asPathName, getPathLocale } from '~/utils/pathUtils'
import { getRuleRoutes, isParentRule } from '~/utils/ruleUtils'

type CreateFileRouteOptions = {
  rule: ConfigRule
  route: ConfigRuleRoute
  parentFileRoute?: FileRoute
}

function createFileRoute({
  rule,
  route,
  parentFileRoute,
}: CreateFileRouteOptions): FileRoute {
  return {
    rootPath: asPathName(
      parentFileRoute ? parentFileRoute.rootPath : route.locale,
      rule.rootPath
    ),
    routePath: asPathName(
      parentFileRoute ? parentFileRoute.routePath : route.locale,
      route.routePath
    ),
  }
}

type GetFileRouteFactory = {
  rule: ConfigRule
  parentFileRoutes?: FileRoute[]
}

function getFileRouteFactory({ rule, parentFileRoutes }: GetFileRouteFactory) {
  return (route: ConfigRuleRoute): FileRoute => {
    const parentLocaleFileRoute = parentFileRoutes?.find(
      ({ rootPath }) => getPathLocale(rootPath) === route.locale
    )

    if (parentLocaleFileRoute) {
      return createFileRoute({
        rule,
        route,
        parentFileRoute: parentLocaleFileRoute,
      })
    }

    return createFileRoute({ rule, route })
  }
}

type GetRoutesFactoryOptions = {
  locales: string[]
}

function getRoutesFactory({ locales }: GetRoutesFactoryOptions) {
  return (rule: ConfigRule): ConfigRuleRoute[] => {
    const pickOrCreateVariant = (locale: string) => {
      const routes = getRuleRoutes(rule)
      const existingRoute = routes?.find((v) => v.locale === locale)
      return existingRoute || { locale, routePath: rule.rootPath }
    }
    return locales.map(pickOrCreateVariant)
  }
}

type GetFileRoutesOptions = {
  rules: ConfigRule[]
  locales: string[]
  parentFileRoutes?: FileRoute[]
  depth?: number
}

export function getFileRoutes({
  rules,
  locales,
  parentFileRoutes = [],
  depth = 0,
}: GetFileRoutesOptions): FileRoute[] {
  const getRoutes = getRoutesFactory({ locales })

  return rules.reduce((acc, rule) => {
    const fileRoutes: FileRoute[] = []
    const routes = getRoutes(rule)

    const rewriteParent = getFileRouteFactory({
      rule,
      parentFileRoutes,
    })

    fileRoutes.push(...routes.map(rewriteParent))

    acc = [...acc, ...fileRoutes]

    if (isParentRule(rule)) {
      acc = [
        ...acc,
        ...getFileRoutes({
          rules: rule.children,
          locales,
          parentFileRoutes: fileRoutes,
          depth: depth + 1,
        }),
      ]
    }

    return acc
  }, [] as FileRoute[])
}
