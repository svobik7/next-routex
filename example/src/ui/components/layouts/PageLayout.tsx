/* eslint-disable @next/next/no-head-element */
import type { RouteLocale, RouteNameStatic, RouteNameDynamic } from 'next-roots'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { getHrefFactory, router } from '~/server/router'
import { Footer } from '../Footer'
import { Header } from '../Header'

type PageLayoutProps = PropsWithChildren<{ locale: RouteLocale }>

export function PageLayout({ children, locale }: PageLayoutProps) {
  const getHref = getHrefFactory(locale)
  const getHrefEng = getHrefFactory('en')
  const getHrefCze = getHrefFactory('cs')

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
            <Link href={getHref('/account')}>Account</Link>
          </li>
          <li>
            <Link href={getHref('/account/profile')}>Account Profile</Link>
          </li>
          <li>
            <Link
              href={getHref('/blog/[authorId]/[articleId]', {
                articleId: '3',
                authorId: '2',
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={getHref('/blog/[authorId]', {
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
            <Link href={getHrefEng('/account')}>Account</Link>
          </li>
          <li>
            <Link href={getHrefEng('/account/profile')}>Account Profile</Link>
          </li>
          <li>
            <Link
              href={getHrefEng('/blog/[authorId]/[articleId]', {
                articleId: '3',
                authorId: '3',
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={getHrefEng('/blog/[authorId]', {
                authorId: '1',
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
            <Link href={getHrefCze('/account')}>Account</Link>
          </li>
          <li>
            <Link href={getHrefCze('/account/profile')}>Account Profile</Link>
          </li>
          <li>
            <Link
              href={getHrefCze('/blog/[authorId]/[articleId]', {
                articleId: '3',
                authorId: '3',
              })}
            >
              Blog Articles Detail
            </Link>
          </li>
          <li>
            <Link
              href={getHrefCze('/blog/[authorId]', {
                authorId: '1',
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
