import type { Config, File } from '../../types'
import { copyDir, isDirectory, moveDir, removeDir } from '../utils/fileUtils'
import { getConfigUtils } from '../config'
import { getRewrites } from '../parsers/getRewrites'
import { getFiles } from '../parsers/getFiles'

function queue<T>(...fns: Array<(arg: T) => void>) {
  return (input: T) => fns.map((fn) => fn(input))
}

function clearLocales(config: Config) {
  const { getOriginLocale, getLocalePath } = getConfigUtils(config)
  const originLocale = getOriginLocale()

  const deleteLocale = (locale: string) =>
    locale !== originLocale && removeDir(getLocalePath(locale))

  config.locales.map(deleteLocale)
}

function createLocales(config: Config) {
  const { getOriginLocale, getLocalePath, getOriginPath } =
    getConfigUtils(config)

  const originLocale = getOriginLocale()
  const originPath = getOriginPath()

  const createLocale = (locale: string) =>
    locale !== originLocale && copyDir(originPath, getLocalePath(locale))

  config.locales.map(createLocale)
}

function rewriteLocales(config: Config) {
  const { getLocalePath } = getConfigUtils(config)

  const rewrites = getRewrites(config)
  const files = getFiles(rewrites)

  const moveFile = (file: File) => {
    const fromPath = getLocalePath(file.from)

    if (!isDirectory(fromPath)) {
      throw new Error(`Path "${fromPath}" does not exist `)
    }

    moveDir(getLocalePath(file.from), getLocalePath(file.to))
  }

  files.map(moveFile)
}

export function buildStructure(config: Config) {
  console.log('\x1b[33mnext-lintel', '\x1b[37m- building localized routes ...')

  const build = queue(clearLocales, createLocales, rewriteLocales)
  build(config)
}
