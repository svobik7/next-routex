import {
  ConfigRule,
  ConfigRuleParent,
  ConfigRuleParentGroup,
  PathName,
} from './types'

import fs from 'fs-extra'
import path from 'path'

export function createPathName(...segments: string[]): PathName {
  const path = `/${segments.join('/')}`
  return path.replace(/\/\/+/g, '/') as PathName
}

export function splitPathName(pathName: PathName): string[] {
  return pathName.split('/')
}

export function getPathNameDepth(pathName: PathName) {
  return splitPathName(pathName).length
}

/**
 * Indicates if given route is parent route
 */
export function isParentRule(rule: ConfigRule): rule is ConfigRuleParent {
  return 'children' in rule
}

/**
 * Indicates if given route is group route = page-less<
 */
export function isGroupRule(rule: ConfigRule): rule is ConfigRuleParentGroup {
  return !!rule.originPath.match(/^\([\w-]+\)$/gi)
}

export function getRuleLintels(rule: ConfigRule) {
  return 'lintels' in rule ? rule.lintels : undefined
}

export function getPathNameLocale(pathName: PathName) {
  return pathName.split('/').at(1)
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
