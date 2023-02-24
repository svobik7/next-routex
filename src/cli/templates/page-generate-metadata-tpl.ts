import type { CompileParams } from './tpl-utils'
import { compileTemplateFactory, getPattern } from './tpl-utils'

export const PATTERNS = {
  originPath: getPattern('originPath'),
  locale: getPattern('locale'),
}

export const tpl = `
import {generateMetadata as generateMetadataOrigin} from '${PATTERNS.originPath}'

export async function generateStaticParams(props) {
  return generateMetadataOrigin({ ...props, route, locale: '${PATTERNS.locale}'  })
}
`

export function compile(params: CompileParams<keyof typeof PATTERNS>) {
  const compileTemplate = compileTemplateFactory(tpl)
  return compileTemplate(params)
}