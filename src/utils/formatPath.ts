type FormattedPath = `/${string}`

export function formatPath(input: string): FormattedPath
export function formatPath(...input: string[]): FormattedPath
export function formatPath(...input: string[]): FormattedPath {
  let pathName = input.join('/')

  pathName = pathName.startsWith('/') ? pathName : `/${pathName}`
  pathName = pathName.replace(/\/\/+/g, '/').replace(/\/$/, '')
  pathName = pathName || '/'

  return pathName as FormattedPath
}
