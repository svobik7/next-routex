type RootPathName = `/${string}`

function asRootPathName(pathName: string): RootPathName {
  return (pathName.startsWith('/') ? pathName : `/${pathName}`) as RootPathName
}

export function asPathName(...segments: string[]) {
  return asRootPathName(segments.join('/').replace(/\/\/+/g, '/'))
}

export function parsePathName(pathName: string) {
  const rootLessPathName = pathName.startsWith('/')
    ? pathName.slice(1)
    : pathName

  const [locale, ...segments] = rootLessPathName.split('/')
  return { locale, segments }
}

export function getPathSegments(pathName: RootPathName): string[] {
  const { segments } = parsePathName(pathName)
  return segments
}

export function getPathDepth(pathName: RootPathName) {
  return getPathSegments(pathName).length
}

export function getPathLocale(pathName: RootPathName) {
  const { locale } = parsePathName(pathName)
  return locale
}

export function isGroupSegment(segment: string) {
  return !!segment.match(/^\([\w-]+\)$/gi)
}
