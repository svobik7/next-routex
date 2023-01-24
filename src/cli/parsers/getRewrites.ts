import { ConfigRule, ConfigRuleLintel, Rewrite } from '../../types'
import { getRuleLintels, isParentRule } from '../utils/parseUtils'
import { getPathLocale, getPathName } from '../utils/pathUtils'

type CreateRewriteOptions = {
  rule: ConfigRule
  lintel: ConfigRuleLintel
  parentRewrite?: Rewrite
}

function createRewrite({
  rule,
  lintel,
  parentRewrite,
}: CreateRewriteOptions): Rewrite {
  return {
    originPath: getPathName(
      parentRewrite ? parentRewrite.originPath : lintel.locale,
      rule.originPath
    ),
    lintelPath: getPathName(
      parentRewrite ? parentRewrite.lintelPath : lintel.locale,
      lintel.lintelPath
    ),
  }
}

type GetRewriteFactory = {
  rule: ConfigRule
  parentRewrites?: Rewrite[]
}

function getRewriteFactory({ rule, parentRewrites }: GetRewriteFactory) {
  return (lintel: ConfigRuleLintel): Rewrite => {
    const parentLocaleRewrite = parentRewrites?.find(
      ({ originPath }) => getPathLocale(originPath) === lintel.locale
    )

    if (parentLocaleRewrite) {
      return createRewrite({
        rule,
        lintel: lintel,
        parentRewrite: parentLocaleRewrite,
      })
    }

    return createRewrite({ rule, lintel })
  }
}

type GetLintelsFactoryOptions = {
  locales: string[]
}

function getLintelsFactory({ locales }: GetLintelsFactoryOptions) {
  return (rule: ConfigRule): ConfigRuleLintel[] => {
    const pickOrCreateVariant = (locale: string) => {
      const lintels = getRuleLintels(rule)
      const existingLintel = lintels?.find((v) => v.locale === locale)
      return existingLintel || { locale, lintelPath: rule.originPath }
    }
    return locales.map(pickOrCreateVariant)
  }
}

type GetRewritesOptions = {
  rules: ConfigRule[]
  locales: string[]
  parentRewrites?: Rewrite[]
  depth?: number
}

export function getRewrites({
  rules,
  locales,
  parentRewrites = [],
  depth = 0,
}: GetRewritesOptions): Rewrite[] {
  const getRuleLintels = getLintelsFactory({ locales })

  return rules.reduce((acc, rule) => {
    const routeRewrites: Rewrite[] = []
    const allRuleLintels = getRuleLintels(rule)

    const rewriteParent = getRewriteFactory({
      rule,
      parentRewrites,
    })

    routeRewrites.push(...allRuleLintels.map(rewriteParent))

    acc = [...acc, ...routeRewrites]

    if (isParentRule(rule)) {
      acc = [
        ...acc,
        ...getRewrites({
          rules: rule.children,
          locales,
          parentRewrites: routeRewrites,
          depth: depth + 1,
        }),
      ]
    }

    return acc
  }, [] as Rewrite[])
}
