import path from 'path'
import { getDiffPos } from '~/cli/utils/getDiffPos'
import {
  formatPath,
  getPathNameInPascalCase,
  getPathNameWithoutExt,
  getPathNameWithoutSymbols,
} from '~/utils/path-utils'
import { pipe } from '~/utils/pipe-utils'
import type { Config, Rewrite } from '../types'

export type CompileFn = (tpl: string, params: CompileParams) => string
export type CompileParams<K extends object = object> = {
  [P in keyof K]: string
}

export function getPattern(name: string) {
  return `{{${name}}}`
}

export function getPatternsFromNames<T extends string>(...names: T[]) {
  return names.reduce(
    (acc, name) => ({ ...acc, [name]: getPattern(name) }),
    {} as Record<T, string>
  )
}

export function compileTemplateFactory(...decorators: CompileFn[]): CompileFn {
  return (tpl: string, params: CompileParams) => {
    // @ts-ignore ignoring more decorators than pipe type expects
    const decorate = pipe(...decorators.filter(Boolean))
    const decoratedTemplate = decorate(tpl)

    return Object.entries(params).reduce(
      (output, [name, value]) =>
        output.replaceAll(getPattern(name), value || ''),
      decoratedTemplate
    )
  }
}

export function getOriginPathFactory({
  getLocalizedAbsolutePath,
  getOriginAbsolutePath,
}: Config) {
  return (rewrite: Rewrite) => {
    const originAbsolutePath = getOriginAbsolutePath(rewrite.originPath)
    const localizedAbsolutePath = getLocalizedAbsolutePath(
      rewrite.localizedPath
    )

    const firstDiffPosition = getDiffPos(
      originAbsolutePath,
      localizedAbsolutePath
    )

    const originRelativePath = formatPath(
      originAbsolutePath.slice(firstDiffPosition)
    )
    const localizedRelativePath = formatPath(
      localizedAbsolutePath.slice(firstDiffPosition)
    )

    const hopUps = path
      .dirname(localizedRelativePath)
      .split('/')
      .slice(1)
      .map(() => '..')

    return getPathNameWithoutExt(path.join(...hopUps, originRelativePath))
  }
}

export function getOriginNameFactory(suffix = 'page') {
  return (rewrite: Rewrite) => {
    const getName = pipe(
      getPathNameWithoutExt,
      getPathNameWithoutSymbols,
      getPathNameInPascalCase
    )

    return getName(
      rewrite.originPath.match(new RegExp(`^/${suffix}.([tj])sx?$`))
        ? `root/${suffix}`
        : rewrite.originPath
    )
  }
}
