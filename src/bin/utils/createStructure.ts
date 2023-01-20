import type { Config, FileRewrite, Route } from '../../types'
import { copyDir, moveDir, removeDir } from '../../utils'
import path from 'path'
import { getFilesRewrites } from './getFilesRewrites'
import { moveSync } from 'fs-extra'

type ClearAllOptions = {
  appDir: string
  locales: string[]
  defaultLocale: string
}

function clearAll({ appDir, defaultLocale, locales }: ClearAllOptions) {
  const rootPath = (locale: string) => path.join(appDir, locale)
  const deleteLocale = (locale: string) =>
    locale !== defaultLocale && removeDir(rootPath(locale))

  locales.map(deleteLocale)
}

type CreateAllOptions = {
  appDir: string
  locales: string[]
  defaultLocale: string
}

function createAll({ appDir, defaultLocale, locales }: CreateAllOptions) {
  const rootPath = (locale: string) => path.join(appDir, locale)
  const defaultLocaleDir = rootPath(defaultLocale)

  const createLocale = (locale: string) =>
    locale !== defaultLocale && copyDir(defaultLocaleDir, rootPath(locale))

  locales.map(createLocale)
}

type RewriteOptions = {
  appDir: string
  locales: string[]
  routes: Route[]
}

function rewriteAll({ appDir, locales, routes }: RewriteOptions) {
  const rootPath = (relativePath: string) => path.join(appDir, relativePath)
  const rewritePath = (fileRewrite: FileRewrite) =>
    moveDir(rootPath(fileRewrite.from), rootPath(fileRewrite.to))

  const filesRewrites = getFilesRewrites({ locales, routes })
  filesRewrites.map(rewritePath)
}

export function createStructure(rootDir: string, config: Config) {
  const { appName, locales, defaultLocale, routes } = config
  const appDir = path.join(rootDir, appName)

  console.log('\x1b[33mnext-roots', '\x1b[37m- clearing localized routes ...')
  clearAll({ appDir, locales, defaultLocale })

  console.log('\x1b[33mnext-roots', '\x1b[37m- generating localized routes ...')
  createAll({ appDir, locales, defaultLocale })

  console.log('\x1b[33mnext-roots', '\x1b[37m- rewriting localized routes ...')
  rewriteAll({ appDir, locales, routes })
}
