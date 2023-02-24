import type { Config, Rewrite } from '../types'
import { getRoute } from '../utils/getRoute'
import type { CompileParams } from './tpl-utils'
import {
  compileTemplateFactory,
  getOriginNameFactory,
  getOriginPathFactory,
  getPattern,
} from './tpl-utils'

export const PATTERNS = {
  originPath: getPattern('originPath'),
  originName: getPattern('originName'),
  routeName: getPattern('routeName'),
  routeHref: getPattern('routeHref'),
}

export const tpl = `
import ${PATTERNS.originName}Origin from '${PATTERNS.originPath}'

const route = { name: '${PATTERNS.routeName}', href: '${PATTERNS.routeHref}' }

export default function ${PATTERNS.originName}(props: any) {
  return <${PATTERNS.originName}Origin {...props} route={route} />
}
`

function getCompileParamsFactory(config: Config) {
  return (rewrite: Rewrite): CompileParams<keyof typeof PATTERNS> => {
    const route = getRoute(rewrite)

    if (!route) {
      throw new Error('Given rewrite is not a page route rewrite.')
    }

    const getOriginPath = getOriginPathFactory(config)
    const getOriginName = getOriginNameFactory('page')

    return {
      originPath: getOriginPath(rewrite),
      originName: getOriginName(rewrite),
      routeName: route.name,
      routeHref: route.href,
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
