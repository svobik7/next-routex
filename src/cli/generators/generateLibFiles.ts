import type { Config } from '~/cli/types'
import { getFilePath, removeFile, writeFile } from '~/utils/fileUtils'
import { getFileRoutes } from '../utils/getFileRoutes'
import { getLibCode } from '../utils/getLibCode'
import { getLibDeclaration } from '../utils/getLibDeclaration'
import { getSchema } from '../utils/getSchema'

const resolvePkg = require('resolve-pkg')
// should be loaded automatically from package json
const PKG_NAME = 'next-routex'

function getDistFilePath(filePath: string) {
  let pkgDir = resolvePkg(PKG_NAME, { cwd: process.cwd() })

  if (!pkgDir) {
    pkgDir = getFilePath(process.cwd(), `node_modules/${PKG_NAME}`)
  }

  return getFilePath(pkgDir, 'dist', filePath)
}

function createCacheFile(filePath: string, contents: string) {
  const cacheFilePath = getDistFilePath(filePath)
  writeFile(cacheFilePath, contents)
}

export function generateLibFiles(config: Config) {
  console.info('\x1b[33mnext-routex', '\x1b[37m- generating router code ...')

  const fileRoutes = getFileRoutes(config)
  const schema = getSchema(fileRoutes)

  const code = getLibCode(schema)
  createCacheFile('cache/schema.js', code)

  const declaration = getLibDeclaration(schema)
  createCacheFile('index.d.ts', declaration)
}
