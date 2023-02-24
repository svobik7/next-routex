import type { CompileParams } from './tpl-utils'
import { compileTemplateFactory, getPattern } from './tpl-utils'

export const PATTERNS = {
  originPath: getPattern('originPath'),
}

export const tpl = `
export {metadata} from '${PATTERNS.originPath}'
`

export function compile(params: CompileParams<keyof typeof PATTERNS>) {
  const compileTemplate = compileTemplateFactory(tpl)
  return compileTemplate(params)
}
