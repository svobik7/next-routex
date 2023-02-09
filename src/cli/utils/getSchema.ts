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
  const toRoutingRecord = (schema: Schema, fileRoute: FileRoute) => {
    if (isGroupFileRoute(fileRoute)) {
      return schema
    }

    const { locale, segments: rootPathSegments } = parsePathName(
      fileRoute.rootPath
    )

    const { segments: routePathSegments } = parsePathName(fileRoute.routePath)

    const route: Route = {
      name: asPathName(...rootPathSegments),
      href: asPathName(
        ...routePathSegments.filter(notGroupSegments).map(withDynamicRegex)
      ),
    }

    const existingRecord = schema.get(locale)

    schema.set(locale, {
      locale: locale,
      routes: [...(existingRecord?.routes || []), route],
    })

    return schema
  }

  return fileRoutes.reduce(toRoutingRecord, new Map() as Schema)
}
