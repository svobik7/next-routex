import type { Schema } from './types'

let schema: Schema = {}
try {
  schema = require('./cache/schema')
} catch {
  throw new Error(
    "Routex schema not found. Did you forget to run 'yarn routex'?"
  )
}

export { schema }
export * from './router/router'
