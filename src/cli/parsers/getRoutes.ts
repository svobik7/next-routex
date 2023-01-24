import { PathName, Rewrite, Route } from '../../types'
import { isGroupRewrite } from '../utils/parseUtils'
import {
  getPathName,
  getPathSegments,
  isGroupSegment,
} from '../utils/pathUtils'

function removeGroupSegments(pathName: PathName): PathName {
  const notGroupSegment = (segment: string) => !isGroupSegment(segment)
  return getPathName(...getPathSegments(pathName).filter(notGroupSegment))
}

export function getRoutes(rewrites: Rewrite[]): Route[] {
  const toRoute = (acc: Route[], rewrite: Rewrite) => {
    if (isGroupRewrite(rewrite)) {
      return acc
    }

    const route = {
      id: rewrite.originPath,
      href: removeGroupSegments(rewrite.lintelPath),
    }

    return [...acc, route]
  }

  return rewrites.reduce(toRoute, [] as Route[])
}
