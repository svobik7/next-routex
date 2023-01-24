export type Config = {
  origin: string
  locales: string[]
  rules: ConfigRule[]
}

export type ConfigRule =
  | ConfigRuleParent
  | ConfigRuleChild
  | ConfigRuleParentGroup

export type ConfigRuleChild = {
  originPath: string
  lintels: ConfigRuleLintel[]
}

export type ConfigRuleParent = ConfigRuleChild & {
  children: Array<ConfigRule>
}

export type ConfigRuleParentGroup = Omit<ConfigRuleParent, 'lintels'> & {
  originPath: `(${string})`
}

export type ConfigRuleLintel = {
  locale: string
  lintelPath: string
}

export type PathName = `/${string}`
export type PathSegment = string

export type Rewrite = {
  originPath: PathName
  lintelPath: PathName
}

export type Route = {
  id: PathName
  href: PathName
}

export type File = {
  source: PathName
  from: PathName
  to: PathName
}
