import type { Route } from '~/types'
import { formatPath } from '~/utils/formatPath'
import { pipe } from '~/utils/pipe'
import type { Rewrite } from '../types'

function removePageSegment(input: string) {
  return input.replace(/\/page\.([tj])sx?$/, '')
}

function removeGroupSegments(input: string) {
  return input.replace(/\/\([\w-]+\)/g, '')
}

function formatDynamicSegments(input: string) {
  return input.replace(/\/\[(\w+)\]/g, '/:$1')
}

function getRouteName({ originPath }: Rewrite) {
  const formatRouteName = pipe(removePageSegment)
  return formatPath(formatRouteName(originPath))
}

function getRouteHref({ localizedPath }: Rewrite) {
  const formatRouteHref = pipe(
    removePageSegment,
    removeGroupSegments,
    formatDynamicSegments,
    formatPath
  )

  return formatRouteHref(localizedPath)
}

function isRouteRewrite({ originPath }: Rewrite): boolean {
  return Boolean(originPath.match(/\/page\.([tj])sx?$/)) || originPath === '/'
}

export function isRoute(input: unknown): input is Route {
  return Boolean(
    input && typeof input === 'object' && 'name' in input && 'href' in input
  )
}

export function getRoute(rewrite: Rewrite): Route | undefined {
  if (isRouteRewrite(rewrite)) {
    return {
      name: getRouteName(rewrite),
      href: getRouteHref(rewrite),
    }
  }

  return undefined
}
