import type { Route, Schema } from '~/types'
import {
  asPathName,
  getPathSegments,
  isGroupSegment,
  parsePathName,
} from '~/utils/pathUtils'
import type { FileRoute } from '../types'

function notGroupSegments(input: string) {
  return !isGroupSegment(input)
}

function withDynamicRegex(input: string) {
  return input.replace(/\[(\w+)\]/, ':$1')
}

function isGroupFileRoute(fileRoute: FileRoute) {
  const lastSegment = getPathSegments(fileRoute.rootPath).at(-1)
  return Boolean(lastSegment && isGroupSegment(lastSegment))
}

export function getSchema(fileRoutes: FileRoute[]): Schema {
  const toRoutingRecord = (acc: Schema, fileRoute: FileRoute) => {
    if (isGroupFileRoute(fileRoute)) {
      return acc
    }

    const { locale: rootLocale, segments: rootPathSegments } = parsePathName(
      fileRoute.rootPath
    )

    const { segments: routePathSegments } = parsePathName(fileRoute.routePath)

    if (!(rootLocale in acc)) {
      acc[rootLocale] = []
    }

    const route: Route = {
      name: asPathName(...rootPathSegments),
      href: asPathName(
        ...routePathSegments.filter(notGroupSegments).map(withDynamicRegex)
      ),
    }

    acc[rootLocale] = [...acc[rootLocale], route]
    return acc
  }

  return fileRoutes.reduce(toRoutingRecord, {} as Schema)
}
