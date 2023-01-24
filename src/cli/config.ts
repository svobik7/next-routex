import { Config } from '../types'
import path from 'path'
import { isDirectory, isFile } from './utils/fileUtils'

// TODO: make this configurable by args
const configPath = 'lintel.config.js'

function getLocalesFactory(config: Config) {
  return () => config.locales
}

function getAppDirFactory(config: Config) {
  const factory = getOriginPathFactory(config)
  return () => path.dirname(factory())
}

function getOriginPathFactory(config: Config) {
  return () => path.join(process.cwd(), config.origin)
}

function getLocalePathFactory(config: Config) {
  const factory = getAppDirFactory(config)
  return (locale: string) => path.join(factory(), locale)
}

function getDefaultLocaleFactory(config: Config) {
  const factory = getOriginPathFactory(config)
  return () => path.basename(factory())
}

export function getConfig() {
  // create final config
  const cfgDefault: Config = {
    origin: './app/en',
    locales: [],
    rules: [],
  }

  // load runtime config
  const cfgRuntime = require(path.join(process.cwd(), configPath))
  const config: Config = { ...cfgDefault, ...cfgRuntime }

  const getOriginPath = getOriginPathFactory(config)

  if (!isDirectory(getOriginPath())) {
    throw new Error('Origin is not valid path')
  }

  return Object.freeze(config)
}

export function getConfigUtils(config: Config) {
  return {
    getAppDir: getAppDirFactory(config),
    getOriginPath: getOriginPathFactory(config),
    getOriginLocale: getDefaultLocaleFactory(config),
    getLocalePath: getLocalePathFactory(config),
    getLocales: getLocalesFactory(config),
  }
}
