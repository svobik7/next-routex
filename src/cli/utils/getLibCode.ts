import type { Schema } from '~/types'

function getSchema(schema: Schema) {
  return JSON.stringify(schema)
}

const replacements = new Map([['{{schema}}', getSchema]])

const template = `
const schema = {{schema}}
module.exports = { schema }
`

export function getLibCode(schema: Schema): string {
  return template.replace(
    /\{\{(schema)\}\}/gi,
    (match: string) => replacements.get(match)?.(schema) || ''
  )
}
