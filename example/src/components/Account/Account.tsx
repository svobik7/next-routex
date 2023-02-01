import Link from 'next/link'
import { getCurrentLocale, getHref } from '~/router'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import styles from './Account.module.css'

export async function Account() {
  const currentLocale = getCurrentLocale()
  return (
    <div className={styles.root}>
      <Header />
      Account - {currentLocale}
      <ul>
        <li>
          <Link
            href={getHref('/blog/articles/[articleId]', {
              articleId: '3',
              locale: 'cs',
            })}
          >
            CS Article Detail
          </Link>
        </li>
        <li>
          <Link
            href={getHref('/blog/articles/[articleId]', {
              articleId: '3',
            })}
          >
            Current Article Detail
          </Link>
        </li>
        <li>
          <Link href={getHref('/account', { locale: 'cs' })}>EN Account</Link>
        </li>
        <li>
          <Link href={getHref('/account/profile', { locale: 'en' })}>
            CS Account Profile
          </Link>
        </li>
        <li>
          <Link href={getHref('/account/profile')}>EN Account</Link>
        </li>
        <li>
          <Link
            href={getHref('/blog/articles/[articleId]', { articleId: '1' })}
          >
            CS Article Detail
          </Link>
        </li>
        <li>
          <Link
            href={getHref('/blog/articles/[articleId]', { articleId: '1' })}
          >
            EN Article Detail
          </Link>
        </li>
        <li>
          <Link href={getHref('/blog/authors/[authorId]', { authorId: '1' })}>
            EN Authors Detail
          </Link>
        </li>
      </ul>
      <Footer currentLocale={currentLocale} />
    </div>
  )
}
