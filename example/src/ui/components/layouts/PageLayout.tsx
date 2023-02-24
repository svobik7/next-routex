/* eslint-disable @next/next/no-head-element */
import type { RouteLocale } from 'next-roots'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { router } from '~/server/router'
import { Footer } from '../Footer'
import { Header } from '../Header'

type PageLayoutProps = PropsWithChildren<{ locale: RouteLocale }>

export function PageLayout({ children, locale }: PageLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex">
        <Header locale={locale} />
      </div>
      <div className="flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-white">
        {children}
      </div>
      <div className="flex flex-col">
        Current locale links:
        <ul>
          <li>
            <Link href={router.getHref('/account', { locale })}>Account</Link>
          </li>
          <li>
            <Link href={router.getHref('/account/profile', { locale })}>
              Account Profile
            </Link>
          </li>
          <li>
            <Link
              href={router.getHref('/blog/[authorId]/[articleId]', {
                articleId: '3',
                authorId: '2',
                locale,
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={router.getHref('/blog/[authorId]', {
                authorId: '1',
                locale,
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
            <Link href={router.getHref('/account', { locale: 'en' })}>
              Account
            </Link>
          </li>
          <li>
            <Link href={router.getHref('/account/profile', { locale: 'en' })}>
              Account Profile
            </Link>
          </li>
          <li>
            <Link
              href={router.getHref('/blog/[authorId]/[articleId]', {
                articleId: '3',
                authorId: '3',
                locale: 'en',
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={router.getHref('/blog/[authorId]', {
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
            <Link href={router.getHref('/account', { locale: 'cs' })}>
              Account
            </Link>
          </li>
          <li>
            <Link href={router.getHref('/account/profile', { locale: 'cs' })}>
              Account Profile
            </Link>
          </li>
          <li>
            <Link
              href={router.getHref('/blog/[authorId]/[articleId]', {
                articleId: '3',
                authorId: '3',
                locale: 'cs',
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={router.getHref('/blog/[authorId]', {
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
        <Footer currentLocale={locale} />
      </div>
    </div>
  )
}
