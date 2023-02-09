import type {
  ConfigRoute,
  ConfigRouteParent,
  ConfigRouteTranslation,
  FileRoute,
} from '~/cli/types'
import { asPathName, getPathLocale } from '~/utils/pathUtils'

function getConfigTranslations(route: ConfigRoute): ConfigRouteTranslation[] {
  return 'translations' in route ? route.translations : []
}

function isParentRoute(route: ConfigRoute): route is ConfigRouteParent {
  return 'children' in route
}

type CreateFileRouteOptions = {
  route: ConfigRoute
  translation: ConfigRouteTranslation
  parentFileRoute?: FileRoute
}

function createFileRoute({
  route,
  translation,
  parentFileRoute,
}: CreateFileRouteOptions): FileRoute {
  return {
    rootPath: asPathName(
      parentFileRoute ? parentFileRoute.rootPath : translation.locale,
      route.rootPath
    ),
    routePath: asPathName(
      parentFileRoute ? parentFileRoute.routePath : translation.locale,
      translation.segment
    ),
  }
}

type GetFileRouteFactory = {
  route: ConfigRoute
  parentFileRoutes?: FileRoute[]
}

function getFileRouteFactory({ route, parentFileRoutes }: GetFileRouteFactory) {
  return (translation: ConfigRouteTranslation): FileRoute => {
    const parentLocaleFileRoute = parentFileRoutes?.find(
      ({ rootPath }) => getPathLocale(rootPath) === translation.locale
    )

    if (parentLocaleFileRoute) {
      return createFileRoute({
        route,
        translation,
        parentFileRoute: parentLocaleFileRoute,
      })
    }

    return createFileRoute({ route, translation })
  }
}

type GetTranslationsFactoryOptions = {
  locales: string[]
}

function getTranslationsFactory({ locales }: GetTranslationsFactoryOptions) {
  return (route: ConfigRoute): ConfigRouteTranslation[] => {
    const pickOrCreateTranslation = (locale: string) => {
      const translations = getConfigTranslations(route)
      const existingTranslation = translations.find((v) => v.locale === locale)
      return existingTranslation || { locale, segment: route.rootPath }
    }
    return locales.map(pickOrCreateTranslation)
  }
}

type GetFileRoutesOptions = {
  routes: ConfigRoute[]
  locales: string[]
  parentFileRoutes?: FileRoute[]
  depth?: number
}

export function getFileRoutes({
  routes: routes,
  locales,
  parentFileRoutes = [],
  depth = 0,
}: GetFileRoutesOptions): FileRoute[] {
  const getTranslations = getTranslationsFactory({ locales })

  return routes.reduce((acc, route) => {
    const fileRoutes: FileRoute[] = []
    const translations = getTranslations(route)

    const toFileRoute = getFileRouteFactory({
      route,
      parentFileRoutes,
    })

    fileRoutes.push(...translations.map(toFileRoute))

    acc = [...acc, ...fileRoutes]

    if (isParentRoute(route)) {
      acc = [
        ...acc,
        ...getFileRoutes({
          routes: route.children,
          locales,
          parentFileRoutes: fileRoutes,
          depth: depth + 1,
        }),
      ]
    }

    return acc
  }, [] as FileRoute[])
}
