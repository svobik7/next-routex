import { getLocaleFactory } from '~/utils/locale-utils'
import type { Config, Rewrite } from '../types'
import type { CompileParams } from './tpl-utils'
import {
  compileTemplateFactory,
  getOriginNameFactory,
  getOriginPathFactory,
  getPattern,
} from './tpl-utils'

export const PATTERNS = {
  originName: getPattern('originName'),
  originPath: getPattern('originPath'),
  locale: getPattern('locale'),
}

export const tpl = `
import ${PATTERNS.originName}Origin from '${PATTERNS.originPath}'

export default function ${PATTERNS.originName}(props: any) {
  return <${PATTERNS.originName}Origin {...props} locale="${PATTERNS.locale}" />
}
`

function getCompileParamsFactory(config: Config) {
  return (rewrite: Rewrite): CompileParams<keyof typeof PATTERNS> => {
    const getOriginPath = getOriginPathFactory(config)
    const getOriginName = getOriginNameFactory('layout')
    const getLocale = getLocaleFactory({
      defaultLocale: config.defaultLocale,
      locales: config.locales,
    })

    return {
      originPath: getOriginPath(rewrite),
      originName: getOriginName(rewrite),
      locale: getLocale(rewrite.localizedPath),
    }
  }
}

export function compileFactory(config: Config) {
  return (rewrite: Rewrite) => {
    const compileTemplate = compileTemplateFactory(tpl)
    const getParams = getCompileParamsFactory(config)

    return compileTemplate(getParams(rewrite))
  }
}
