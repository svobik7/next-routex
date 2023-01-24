import fs from 'fs-extra'
import path from 'path'

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
 * Indicates if path is file
 */
export function isFile(path: string): boolean {
  if (!fs.existsSync(path)) return false
  return fs.statSync(path).isFile()
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
 * Creates directory in given path recursively
 */
export function makeDir(dirPath: string): void {
  dirPath = path.dirname(dirPath)

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Removes given directory recursively
 */
export function removeDir(dir: string): void {
  if (!fs.existsSync(dir)) return
  fs.removeSync(dir)
}

/**
 * Indicates if path is directory
 */
export function isDirectory(path: string): boolean {
  if (!fs.existsSync(path)) return false
  return fs.statSync(path).isDirectory()
}
