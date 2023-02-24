import path from 'path'
import resolvePkg from 'resolve-pkg'
import type { CliParams, Config } from '~/cli/types'
import { isDirectory } from '~/utils/fileUtils'

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
  const projectRoot = process.cwd()
  const packageRoot = getPackageDir(projectRoot)
  const distRoot = path.join(packageRoot, 'dist')

  const getOriginAbsolutePath = getPathFactory(
    path.join(projectRoot, cliParams.originDir)
  )

  if (!isDirectory(getOriginAbsolutePath())) {
    throw new Error('Invalid "rootsDir" path')
  }

  const getLocalizedAbsolutePath = getPathFactory(
    path.join(projectRoot, cliParams.localizedDir)
  )

  if (!isDirectory(getLocalizedAbsolutePath())) {
    throw new Error('Invalid "appDir" path')
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
