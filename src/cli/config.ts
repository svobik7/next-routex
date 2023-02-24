import path from 'path'
import resolvePkg from 'resolve-pkg'
import type { CliParams, Config } from '~/cli/types'
import { isDirectory } from '~/utils/fs-utils'

export const PKG_NAME = 'next-roots'
export const DEFAULT_ORIGIN_DIR = './roots'
export const DEFAULT_LOCALIZE_DIR = './app'

function getPackageDir(projectRoot: string) {
  let pkgDir = resolvePkg(PKG_NAME, { cwd: projectRoot }) || ''

  if (!pkgDir) {
    pkgDir = path.join(projectRoot, `node_modules/${PKG_NAME}`)
  }

  return pkgDir
}

function getPathFactory(dirName: string) {
  return (fileName = '') => path.join(dirName, fileName)
}

export function getConfig(cliParams: CliParams): Config {
  const packageRoot = getPackageDir(process.cwd())
  const distRoot = path.join(packageRoot, 'dist')

  const getOriginAbsolutePath = getPathFactory(cliParams.originDir)
  const getLocalizedAbsolutePath = getPathFactory(cliParams.localizedDir)

  if (!isDirectory(getOriginAbsolutePath())) {
    throw new Error('Invalid "originDir" path')
  }

  if (!isDirectory(getLocalizedAbsolutePath())) {
    throw new Error('Invalid "localizeDir" path')
  }

  const getDistAbsolutePath = getPathFactory(distRoot)
  const getCacheAbsolutePath = getPathFactory(path.join(distRoot, 'cache'))

  const defaultLocale = cliParams.defaultLocale || cliParams.locales.at(0) || ''

  if (!cliParams.locales.includes(defaultLocale)) {
    throw new Error('Invalid or empty "defaultLocale". Not found in "locales"')
  }

  return Object.freeze({
    locales: cliParams.locales,
    defaultLocale,
    getLocalizedAbsolutePath,
    getOriginAbsolutePath,
    getDistAbsolutePath,
    getCacheAbsolutePath,
  })
}
