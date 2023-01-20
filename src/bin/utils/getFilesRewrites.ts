import { FileRewrite, Route, RouteRewrite } from '../../types'
import { getRoutesRewrites } from './getRoutesRewrites'
import path from 'path'

type GetFilesRewritesOptions = {
  routes: Route[]
  locales: string[]
}

export function getFilesRewrites({
  routes,
  locales,
}: GetFilesRewritesOptions): FileRewrite[] {
  const parentMatcher = ({ href: routeHref }: RouteRewrite) => {
    const expectedParentTo = path.dirname(routeHref)
    return (fileRewrite: FileRewrite) => fileRewrite.to === expectedParentTo
  }

  const toFileRewrite = (acc: FileRewrite[], routeRewrite: RouteRewrite) => {
    const findParent = parentMatcher(routeRewrite)
    const parentFileRewrite = acc.find(findParent)

    const fileRewrite = {
      source: routeRewrite.path,
      from: parentFileRewrite
        ? routeRewrite.path.replace(
            parentFileRewrite.source,
            parentFileRewrite.to
          )
        : routeRewrite.path,
      to: routeRewrite.href,
    }

    return [...acc, fileRewrite]
  }

  const routesRewrites = getRoutesRewrites({ routes, locales }).sort(
    ({ depth: a }, { depth: b }) => a - b
  )

  return routesRewrites.reduce(toFileRewrite, [] as FileRewrite[])
}
