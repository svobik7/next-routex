import fs from 'fs-extra'
import path from 'path'

/**
 * Create file in given path and writes given content into it
 */
export function writeFile(filePath: string, content: string): void {
  makeDir(filePath)
  fs.writeFileSync(filePath, content)
}

/**
 * Create file in given path and writes given content into it
 * @returns string
 */
export function readFile(
  path: string,
  encoding: BufferEncoding = 'utf8'
): string {
  if (!isFile(path)) return ''
  return fs.readFileSync(path).toString(encoding)
}

/**
 * Copies file from `from` to `to`
 */
export function copyFile(from: string, to: string): void {
  if (from !== to) {
    makeDir(to)
    fs.copyFileSync(from, to)
  }
}

/**
 * Removes given directory recursively
 */
export function removeFile(dirPath: string): void {
  if (!fs.existsSync(dirPath)) return
  fs.removeSync(dirPath)
}

/**
 * Indicates if filePath is file
 */
export function isFile(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false
  return fs.statSync(filePath).isFile()
}

/**
 * Copies directory from `from` to `to` recursively
 */
export function moveDir(from: string, to: string): void {
  if (from !== to && isDirectory(from)) {
    fs.moveSync(from, to)
  }
}

/**
 * Copies directory from `from` to `to` recursively
 */
export function copyDir(from: string, to: string): void {
  if (from !== to && isDirectory(from)) {
    makeDir(to)

    const files = fs.readdirSync(from)

    files.forEach((currentPath: string) => {
      const currentFrom = path.join(from, currentPath)
      const currentTo = path.join(to, currentPath)

      isDirectory(currentFrom)
        ? copyDir(currentFrom, currentTo)
        : copyFile(currentFrom, currentTo)
    })
  }
}

/**
 * Creates directory in given dirPath recursively
 */
export function makeDir(dirPath: string): void {
  dirPath = path.dirname(dirPath)

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Indicates if dirPath is directory
 */
export function isDirectory(dirPath: string): boolean {
  if (!fs.existsSync(dirPath)) return false
  return fs.statSync(dirPath).isDirectory()
}

/**
 * Constructs file path from segments
 */
export function getFilePath(...segments: string[]): string {
  return path.join(...segments)
}
