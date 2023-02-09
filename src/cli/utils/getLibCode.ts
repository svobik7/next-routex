import type { Schema } from '~/types'

function getEntries(schema: Schema) {
  const entries = []

  for (const entry of schema.entries()) {
    entries.push(entry)
  }

  return JSON.stringify(entries)
}

const replacements = new Map([['{{entries}}', getEntries]])

const template = `
const schema = new Map({{entries}});
schema.set("__default", schema.entries().next().value[1]);
module.exports = schema;
`

export function getLibCode(schema: Schema): string {
  return template.replace(
    /\{\{(entries)\}\}/gi,
    (match: string) => replacements.get(match)?.(schema) || ''
  )
}
