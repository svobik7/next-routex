import path from 'path'
import type { Config } from '~/cli/types'
import { isDirectory } from '~/utils/fileUtils'

// TODO: make this configurable by args
const configPath = 'roots.config.js'

function getDefaultLocaleFactory(config: Config) {
  return () => {
    const defaultLocale = config.locales.at(0)

    if (!defaultLocale) {
      throw new Error('Default locale was not specified.')
    }

    return defaultLocale
  }
}

function getRootPathFactory(config: Config) {
  return () => path.join(process.cwd(), config.rootDir)
}

function getLocalePathFactory(config: Config) {
  const getRootPath = getRootPathFactory(config)
  return (locale: string) => path.join(getRootPath(), locale)
}

function getDefaultLocalePathFactory(config: Config) {
  const getDefaultLocale = getDefaultLocaleFactory(config)
  const getRootPath = getRootPathFactory(config)
  return () => {
    return path.join(getRootPath(), getDefaultLocale())
  }
}

export function getConfig() {
  // create final config
  const cfgDefault: Config = {
    rootDir: './app',
    locales: [],
    routes: [],
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cfgRuntime = require(path.join(process.cwd(), configPath))
  const config: Config = { ...cfgDefault, ...cfgRuntime }

  const getRootPath = getRootPathFactory(config)

  if (!isDirectory(getRootPath())) {
    throw new Error('Root path is not valid path')
  }

  const getDefaultLocalePath = getDefaultLocalePathFactory(config)

  if (!isDirectory(getDefaultLocalePath())) {
    throw new Error('Default locale path is not valid path')
  }

  return Object.freeze(config)
}

export function getConfigUtils(config: Config) {
  return {
    getRootPath: getRootPathFactory(config),
    getLocalePath: getLocalePathFactory(config),
    getDefaultLocalePath: getDefaultLocalePathFactory(config),
    getDefaultLocale: getDefaultLocaleFactory(config),
  }
}
