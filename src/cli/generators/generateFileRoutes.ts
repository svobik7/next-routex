import { getConfigUtils } from '~/cli/config'
import type { Config, FileRewrite } from '~/cli/types'
import { queue } from '~/utils/baseUtils'
import { copyDir, isDirectory, moveDir, removeFile } from '~/utils/fileUtils'
import { getFileRewrites } from '../utils/getFileRewrites'
import { getFileRoutes } from '../utils/getFileRoutes'

/**
 * Removes all localized file routes but root
 * @param config
 */
function clearRoutes(config: Config) {
  const { getRootLocale, getLocalePath } = getConfigUtils(config)
  const rootLocale = getRootLocale()

  const deleteLocale = (locale: string) =>
    locale !== rootLocale && removeFile(getLocalePath(locale))

  config.locales.map(deleteLocale)
}

/**
 * Create all localized file routes by duplicating root routes
 * @param config
 */
function createRoutes(config: Config) {
  const { getRootLocale, getLocalePath, getRootPath } = getConfigUtils(config)

  const rootLocale = getRootLocale()
  const rootPath = getRootPath()

  const createLocale = (locale: string) =>
    locale !== rootLocale && copyDir(rootPath, getLocalePath(locale))

  config.locales.map(createLocale)
}

/**
 * Rewrites localized routes to their localized paths
 * @param config
 */
function rewriteRoutes(config: Config) {
  const { getLocalePath } = getConfigUtils(config)

  const fileRoutes = getFileRoutes(config)
  const fileRewrites = getFileRewrites(fileRoutes)

  const moveFile = (file: FileRewrite) => {
    const fromPath = getLocalePath(file.from)

    if (!isDirectory(fromPath)) {
      throw new Error(`Path "${fromPath}" does not exist `)
    }

    moveDir(getLocalePath(file.from), getLocalePath(file.to))
  }

  fileRewrites.map(moveFile)
}

export function generateFileRoutes(config: Config) {
  // eslint-disable-next-line no-console
  console.log('\x1b[33mnext-routex', '\x1b[37m- generating file routes ...')
  queue(clearRoutes, createRoutes, rewriteRoutes)(config)
}
