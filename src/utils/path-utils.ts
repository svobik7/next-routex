import path from 'path'

export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export function getPathNameWithoutExt(pathName: string): string {
  const newFileName = path.basename(pathName, path.extname(pathName))
  const newFilePath = path.join(path.dirname(pathName), newFileName)

  return newFilePath
}

export function getPathNameWithoutSymbols(pathName: string): string {
  return pathName.replace(/[^a-zA-Z0-9/_-]+/gi, '')
}

export function getPathNameInPascalCase(pathName: string): string {
  return pathName.split('/').map(capitalize).join('')
}

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
