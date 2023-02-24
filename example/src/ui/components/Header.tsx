import { server } from '~/server'
import { LocaleButton } from './buttons/LocaleButton/LocaleButton'

export function Header() {
  return (
    <div className="flex flex-1 justify-end">
      <LocaleButton locale={server.router.getLocale()} />
    </div>
  )
}
