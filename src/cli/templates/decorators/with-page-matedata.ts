import type { CompileFn } from '../tpl-utils'
import { getPattern } from '../tpl-utils'

export const PATTERNS = {
  originPath: getPattern('originPath'),
}

export const tplStatic = `
export { metadata } from '${PATTERNS.originPath}'
`

export const tplDynamic = `
export { generateMetadata } from '${PATTERNS.originPath}'
`

export function withPageStaticMetaData(input: string) {
  return `${input}${tplStatic}`
}

export function withPageDynamicMetaData(input: string) {
  return `${input}${tplDynamic}`
}

export function withPageMetadataDecoratorFactory(
  originContents: string
): CompileFn {
  if (originContents.match(/export async function generateMetadata/g)) {
    return withPageDynamicMetaData
  }

  if (originContents.match(/export const metadata/g)) {
    return withPageStaticMetaData
  }

  return (i: string) => i
}
