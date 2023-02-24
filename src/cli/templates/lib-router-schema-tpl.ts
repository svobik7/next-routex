import type { RouterSchema } from '~/types'
import type { CompileParams } from './tpl-utils'
import { compileTemplateFactory, getPattern } from './tpl-utils'

export const PATTERNS = {
  schema: getPattern('schema'),
}

export const tpl = `
module.exports = Object.freeze(${PATTERNS.schema});
`

function getCompileParams(
  schema: RouterSchema
): CompileParams<keyof typeof PATTERNS> {
  return {
    schema: JSON.stringify(schema),
  }
}

export function compile(schema: RouterSchema) {
  const compileTemplate = compileTemplateFactory(tpl)
  const compileParams = getCompileParams(schema)
  return compileTemplate(compileParams)
}
