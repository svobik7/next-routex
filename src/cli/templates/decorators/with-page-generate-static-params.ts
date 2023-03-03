import type { CompileFn } from '../tpl-utils'
import { getPattern } from '../tpl-utils'

export const PATTERNS = {
  originPath: getPattern('originPath'),
  locale: getPattern('locale'),
}

export const tpl = `
import {generateStaticParams as generateStaticParamsOrigin} from '${PATTERNS.originPath}'

export async function generateStaticParams(props) {
  return generateStaticParamsOrigin({ ...props, route, locale: '${PATTERNS.locale}'  })
}
`

export function withPageGenerateStaticParams(input: string) {
  return `${input}${tpl}`
}

export function withPageGenerateStaticParamsFactory(
  originContents: string
): CompileFn {
  if (originContents.match(/export async function generateStaticParams/g)) {
    return withPageGenerateStaticParams
  }

  return (i: string) => i
}
