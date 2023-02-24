import path from 'path'
import {
  getPathNameInPascalCase,
  getPathNameWithoutBrackets,
  getPathNameWithoutExt,
} from '~/utils/fileUtils'
import { formatPath } from '~/utils/formatPath'
import { getDiffPos } from '~/utils/getDiffPos'
import { pipe } from '~/utils/pipe'
import type { Config, Rewrite } from '../types'

export function getPattern(replacementName: string) {
  return `{{${replacementName}}}`
}

export const PATTERNS = {
  originName: getPattern('originPath'),
  originPath: getPattern('originName'),
  routeName: getPattern('routeName'),
  routeHref: getPattern('routeHref'),
  locale: getPattern('locale'),
}

export type CompileParams<K extends keyof any> = { [P in K]: string }

export function compileTemplateFactory(template: string) {
  return (replacements: Record<string, string>) => {
    let output = template
    Object.keys(replacements).forEach((key) => {
      output = output.replaceAll(getPattern(key), replacements[key] || '')
    })
    return output
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
      getPathNameWithoutBrackets,
      getPathNameInPascalCase
    )

    return getName(
      rewrite.originPath.match(new RegExp(`^/${suffix}.([tj])sx?$`))
        ? `root/${suffix}`
        : rewrite.originPath
    )
  }
}
