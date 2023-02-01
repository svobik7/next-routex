export type Config = {
  rootDir: string
  locales: string[]
  rules: ConfigRule[]
}

export type ConfigRule =
  | ConfigRuleParent
  | ConfigRuleChild
  | ConfigRuleGroup
  | ConfigRuleDynamic

export type ConfigRuleChild = {
  rootPath: string
  routes: ConfigRuleRoute[]
}

export type ConfigRuleParent = ConfigRuleChild & {
  children: Array<ConfigRule>
}

export type ConfigRuleGroup = Omit<ConfigRuleParent, 'routes'> & {
  rootPath: `(${string})`
}

export type ConfigRuleDynamic = Omit<
  ConfigRuleParent | ConfigRuleChild,
  'routes'
> & {
  rootPath: `[${string}]`
  // regExp?: string
}

export type ConfigRuleRoute = {
  locale: string
  routePath: string
}

export type FileRoute = {
  rootPath: `/${string}`
  routePath: `/${string}`
}

export type FileRewrite = {
  source: `/${string}`
  from: `/${string}`
  to: `/${string}`
}
