import { headers } from 'next/headers'
import { schema, Routex } from 'node_modules/next-routex'

export const router = new Routex(schema, {
  currentLocale: headers().get('NEXT_ROUTEX_LOCALE') || '',
})
