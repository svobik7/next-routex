import Link from 'next/link'
import { getRouter } from '~/config/router'
import { Footer } from './Footer'
import { Header } from './Header'

export async function Account() {
  const router = getRouter()
  const currentLocale = router.getLocale()
  return (
    <div className="">
      <Header />
      Account - {currentLocale}
      <ul>
        <li>
          <Link
            href={router.getHref('/blog/articles/[articleId]', {
              articleId: '3',
              locale: 'cs',
            })}
          >
            CS Article Detail
          </Link>
        </li>
        <li>
          <Link
            href={router.getHref('/blog/articles/[articleId]', {
              articleId: '3',
            })}
          >
            Current Article Detail
          </Link>
        </li>
        <li>
          <Link href={router.getHref('/account', { locale: 'cs' })}>
            EN Account
          </Link>
        </li>
        <li>
          <Link href={router.getHref('/account/profile', { locale: 'en' })}>
            CS Account Profile
          </Link>
        </li>
        <li>
          <Link href={router.getHref('/account/profile')}>EN Account</Link>
        </li>
        <li>
          <Link
            href={router.getHref('/blog/articles/[articleId]', {
              articleId: '1',
            })}
          >
            CS Article Detail
          </Link>
        </li>
        <li>
          <Link
            href={router.getHref('/blog/articles/[articleId]', {
              articleId: '1',
            })}
          >
            EN Article Detail
          </Link>
        </li>
        <li>
          <Link
            href={router.getHref('/blog/authors/[authorId]', { authorId: '1' })}
          >
            EN Authors Detail
          </Link>
        </li>
      </ul>
      <Footer currentLocale={currentLocale} />
    </div>
  )
}
