import path from 'path'
import type { Config } from '~/cli/types'
import { isDirectory } from '~/utils/fileUtils'

// TODO: make this configurable by args
const configPath = 'routex.config.js'

function getLocalesFactory(config: Config) {
  return () => config.locales
}

function getAppDirFactory(config: Config) {
  const factory = getRootPathFactory(config)
  return () => path.dirname(factory())
}

function getRootPathFactory(config: Config) {
  return () => path.join(process.cwd(), config.rootDir)
}

function getLocalePathFactory(config: Config) {
  const factory = getAppDirFactory(config)
  return (locale: string) => path.join(factory(), locale)
}

function getDefaultLocaleFactory(config: Config) {
  const factory = getRootPathFactory(config)
  return () => path.basename(factory())
}

export function getConfig() {
  // create final config
  const cfgDefault: Config = {
    rootDir: './app/en',
    locales: [],
    rules: [],
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cfgRuntime = require(path.join(process.cwd(), configPath))
  const config: Config = { ...cfgDefault, ...cfgRuntime }

  const getRootPath = getRootPathFactory(config)

  if (!isDirectory(getRootPath())) {
    throw new Error('Root path is not valid path')
  }

  return Object.freeze(config)
}

export function getConfigUtils(config: Config) {
  return {
    getAppDir: getAppDirFactory(config),
    getRootPath: getRootPathFactory(config),
    getRootLocale: getDefaultLocaleFactory(config),
    getLocalePath: getLocalePathFactory(config),
    getLocales: getLocalesFactory(config),
  }
}
