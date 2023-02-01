import type { Config } from '~/cli/types'
import { getFilePath, removeFile, writeFile } from '~/utils/fileUtils'
import { getFileRoutes } from '../utils/getFileRoutes'
import { getLibCode } from '../utils/getLibCode'
import { getLibDeclaration } from '../utils/getLibDeclaration'
import { getSchema } from '../utils/getSchema'

const resolvePkg = require('resolve-pkg')
const CACHE_PKG_ALIAS = '.next-routex'

function getCacheFilePath(filePath: string) {
  let cacheDirPath = resolvePkg(CACHE_PKG_ALIAS, { cwd: process.cwd() })

  if (!cacheDirPath) {
    cacheDirPath = getFilePath(process.cwd(), `node_modules/${CACHE_PKG_ALIAS}`)
  }

  return getFilePath(cacheDirPath, filePath)
}

function createCacheFile(filePath: string, contents: string) {
  const cacheFilePath = getCacheFilePath(filePath)
  writeFile(cacheFilePath, contents)
}

export function generateLibFiles(config: Config) {
  console.log('\x1b[33mnext-routex', '\x1b[37m- generating router code ...')

  const cacheDir = getCacheFilePath('router')
  removeFile(cacheDir)

  const fileRoutes = getFileRoutes(config)
  const schema = getSchema(fileRoutes)

  const routerCode = getLibCode(schema)
  createCacheFile('router/index.js', routerCode)

  const routerTypes = getLibDeclaration(schema)
  createCacheFile('router/index.d.ts', routerTypes)
}
