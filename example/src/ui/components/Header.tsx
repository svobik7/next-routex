import { router } from '~/server/router'
import { LocaleButton } from './buttons/LocaleButton/LocaleButton'

type HeaderProps = { locale: string }
export function Header({ locale }: HeaderProps) {
  return (
    <div className="flex flex-1 justify-end">
      <LocaleButton locale={locale} />
    </div>
  )
}
