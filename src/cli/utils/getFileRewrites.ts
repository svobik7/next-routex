import path from 'path'
import type { FileRewrite, FileRoute } from '~/cli/types'
import { asPathName, getPathDepth } from '~/utils/pathUtils'

function sortByDepth({ rootPath: a }: FileRoute, { rootPath: b }: FileRoute) {
  return getPathDepth(a) - getPathDepth(b)
}

export function getFileRewrites(fileRoutes: FileRoute[]): FileRewrite[] {
  const parentMatcher = ({ routePath }: FileRoute) => {
    const expectedParentTo = path.dirname(routePath)
    return (fileRewrite: FileRewrite) => fileRewrite.to === expectedParentTo
  }

  const toRewrite = (rewrites: FileRewrite[], fileRoute: FileRoute) => {
    const findParentRewrite = parentMatcher(fileRoute)
    const parentRewrite = rewrites.find(findParentRewrite)

    const file = {
      source: fileRoute.rootPath,
      from: asPathName(
        parentRewrite
          ? fileRoute.rootPath.replace(parentRewrite.source, parentRewrite.to)
          : fileRoute.rootPath
      ),
      to: fileRoute.routePath,
    }

    return [...rewrites, file]
  }

  return fileRoutes.sort(sortByDepth).reduce(toRewrite, [] as FileRewrite[])
}
