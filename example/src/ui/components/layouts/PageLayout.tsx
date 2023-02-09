/* eslint-disable @next/next/no-head-element */
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { server } from '~/server'
import { Footer } from '../Footer'
import { Header } from '../Header'

type PageLayoutProps = PropsWithChildren

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex">
        <Header />
      </div>
      <div className="flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-white">
        {children}
      </div>
      <div className="flex flex-col">
        Current locale links:
        <ul>
          <li>
            <Link href={server.router.getHref('/account')}>Account</Link>
          </li>
          <li>
            <Link href={server.router.getHref('/account/profile')}>
              Account Profile
            </Link>
          </li>
          <li>
            <Link
              href={server.router.getHref('/blog/articles/[articleId]', {
                articleId: '3',
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={server.router.getHref('/blog/authors/[authorId]', {
                authorId: '1',
              })}
            >
              Blog Authors Detail
            </Link>
          </li>
        </ul>
      </div>
      <div>
        EN locale links:
        <ul>
          <li>
            <Link href={server.router.getHref('/account', { locale: 'en' })}>
              Account
            </Link>
          </li>
          <li>
            <Link
              href={server.router.getHref('/account/profile', { locale: 'en' })}
            >
              Account Profile
            </Link>
          </li>
          <li>
            <Link
              href={server.router.getHref('/blog/articles/[articleId]', {
                articleId: '3',
                locale: 'en',
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={server.router.getHref('/blog/authors/[authorId]', {
                authorId: '1',
                locale: 'en',
              })}
            >
              Blog Authors Detail
            </Link>
          </li>
        </ul>
      </div>
      <div>
        CS locale links:
        <ul>
          <li>
            <Link href={server.router.getHref('/account', { locale: 'cs' })}>
              Account
            </Link>
          </li>
          <li>
            <Link
              href={server.router.getHref('/account/profile', { locale: 'cs' })}
            >
              Account Profile
            </Link>
          </li>
          <li>
            <Link
              href={server.router.getHref('/blog/articles/[articleId]', {
                articleId: '3',
                locale: 'cs',
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={server.router.getHref('/blog/authors/[authorId]', {
                authorId: '1',
                locale: 'cs',
              })}
            >
              Blog Authors Detail
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex">
        <Footer currentLocale={server.currentLocale} />
      </div>
    </div>
  )
}
