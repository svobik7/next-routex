import type { Config, File } from '../../types'
import { copyDir, isDirectory, moveDir, removeDir } from '../../utils'
import { getConfigUtils } from '../config'

import { getFiles } from './getFiles'
import { getRewrites } from './getRewrites'

function clearAll(config: Config) {
  const { getOriginLocale, getLocalePath } = getConfigUtils(config)
  const originLocale = getOriginLocale()

  const deleteLocale = (locale: string) =>
    locale !== originLocale && removeDir(getLocalePath(locale))

  config.locales.map(deleteLocale)
}

function createAll(config: Config) {
  const { getOriginLocale, getLocalePath, getOriginPath } =
    getConfigUtils(config)

  const originLocale = getOriginLocale()
  const originPath = getOriginPath()

  const createLocale = (locale: string) =>
    locale !== originLocale && copyDir(originPath, getLocalePath(locale))

  config.locales.map(createLocale)
}

function rewriteAll(config: Config, files: File[]) {
  const { getLocalePath } = getConfigUtils(config)

  const moveFile = (file: File) => {
    const fromPath = getLocalePath(file.from)

    if (!isDirectory(fromPath)) {
      throw new Error(`Path "${fromPath}" does not exist `)
    }

    moveDir(getLocalePath(file.from), getLocalePath(file.to))
  }

  files.map(moveFile)
}

export function createStructure(config: Config) {
  const rewrites = getRewrites(config)
  const files = getFiles(rewrites)

  console.log('\x1b[33mnext-roots', '\x1b[37m- clearing localized routes ...')
  clearAll(config)

  console.log('\x1b[33mnext-roots', '\x1b[37m- generating localized routes ...')
  createAll(config)

  console.log('\x1b[33mnext-roots', '\x1b[37m- rewriting localized routes ...')
  rewriteAll(config, files)
}
