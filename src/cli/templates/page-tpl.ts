import { getLocaleFactory } from '~/utils/locale-utils'
import { isDynamicRewrite } from '~/utils/rewrite-utils'
import type { Config, Rewrite } from '../types'
import { getRoute } from '../utils/getRoute'
import type { PATTERNS as GENERATE_STATIC_PARAMS_PATTERS } from './decorators/with-page-generate-static-params'
import { withPageGenerateStaticParamsFactory } from './decorators/with-page-generate-static-params'
import { withPageMetadataDecoratorFactory } from './decorators/with-page-matedata'
import type { CompileParams } from './tpl-utils'
import {
  compileTemplateFactory,
  getOriginNameFactory,
  getOriginPathFactory,
  getPatternsFromNames
} from './tpl-utils'

export const PATTERNS = getPatternsFromNames(
  'originPath',
  'originName',
  'pageHref'
)

export const tplStatic = `
import ${PATTERNS.originName}Origin from '${PATTERNS.originPath}'

export default function ${PATTERNS.originName}(props: any) {
  return <${PATTERNS.originName}Origin {...props} pageHref="${PATTERNS.pageHref}" />
}
`

export const tplDynamic = `
import ${PATTERNS.originName}Origin from '${PATTERNS.originPath}'
import { compileHref } from 'next-roots'

export default function ${PATTERNS.originName}({ params, ...otherProps }: any) {
  return <${PATTERNS.originName}Origin {...otherProps} params={params} pageHref={compileHref('${PATTERNS.pageHref}', params)} />
}
`

function getCompileParamsFactory(config: Config) {
  return (
    rewrite: Rewrite
  ): CompileParams<typeof PATTERNS & typeof GENERATE_STATIC_PARAMS_PATTERS> => {
    const route = getRoute(rewrite)

    if (!route) {
      throw new Error('Given rewrite is not a page route rewrite.')
    }

    const getOriginPath = getOriginPathFactory(config)
    const getOriginName = getOriginNameFactory('page')
    const getLocale = getLocaleFactory({
      defaultLocale: config.defaultLocale,
      locales: config.locales,
    })

    return {
      originPath: getOriginPath(rewrite),
      originName: getOriginName(rewrite),
      pageHref: route.href,
      locale: getLocale(rewrite.localizedPath),
    }
  }
}

export function compileFactory(config: Config) {
  const getCompileParams = getCompileParamsFactory(config)

  return (rewrite: Rewrite) => {
    const tpl = isDynamicRewrite(rewrite) ? tplDynamic : tplStatic
    const params = getCompileParams(rewrite)

    const originContents = config.getOriginContents(rewrite.originPath)

    const compileTemplate = compileTemplateFactory(
      withPageMetadataDecoratorFactory(originContents),
      withPageGenerateStaticParamsFactory(originContents)
    )

    return compileTemplate(tpl, params)
  }
}
