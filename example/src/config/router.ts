import { Router, schema } from 'next-routex'
import { headers } from 'next/headers'

const router = new Router(schema)

export function getRouter() {
  const locale = headers().get('NEXT_ROUTEX_LOCALE') || router.getLocale()
  router.setLocale(locale)

  return router
}
