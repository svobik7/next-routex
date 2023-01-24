import { ConfigRule, ConfigRuleParent, Rewrite } from '../../types'
import { getPathSegments, isGroupSegment } from './pathUtils'

export function isParentRule(rule: ConfigRule): rule is ConfigRuleParent {
  return 'children' in rule
}

export function isGroupRewrite(rewrite: Rewrite) {
  const lastSegment = getPathSegments(rewrite.originPath).at(-1)
  return Boolean(lastSegment && isGroupSegment(lastSegment))
}

export function getRuleLintels(rule: ConfigRule) {
  return 'lintels' in rule ? rule.lintels : undefined
}
