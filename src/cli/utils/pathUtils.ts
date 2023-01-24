import { PathName, PathSegment } from '../../types'

export function getPathName(...segments: string[]): PathName {
  const path = `/${segments.join('/')}`
  return path.replace(/\/\/+/g, '/') as PathName
}

export function getPathSegments(pathName: PathName): PathSegment[] {
  return pathName.split('/')
}

export function getPathDepth(pathName: PathName) {
  return getPathSegments(pathName).length
}

export function getPathLocale(pathName: PathName) {
  const [, locale] = getPathSegments(pathName)
  return locale
}

export function isGroupSegment(segment: string) {
  return !!segment.match(/^\([\w-]+\)$/gi)
}
