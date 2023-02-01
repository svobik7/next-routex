import type { ConfigRule, ConfigRuleParent, ConfigRuleRoute } from '~/cli/types'

export function isParentRule(rule: ConfigRule): rule is ConfigRuleParent {
  return 'children' in rule
}

export function getRuleRoutes(rule: ConfigRule): ConfigRuleRoute[] | undefined {
  return 'routes' in rule ? rule.routes : undefined
}
