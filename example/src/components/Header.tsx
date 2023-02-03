import { getRouter } from '~/config/router'

export function Header() {
  const currentLocale = getRouter().getLocale()
  return <div>THis is simple header server component - {currentLocale}</div>
}
