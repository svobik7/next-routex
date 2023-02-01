import { getCurrentLocale } from '~/router'

export function Header() {
  const currentLocale = getCurrentLocale()
  return <div>THis is simple header server component - {currentLocale}</div>
}
