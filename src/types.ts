export type Route = {
  name: `/${string}`
  href: `/${string}`
}

export type SchemaRecord = { locale: string; routes: Route[] }
export type Schema = Map<string | '__default', SchemaRecord>
