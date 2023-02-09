/* eslint-disable @next/next/no-head-element */
import type { PropsWithChildren } from 'react'
import { server } from '~/server'

import '~/ui/styles.css'
import { PageLayout } from './PageLayout'

type RootLayoutProps = PropsWithChildren<{ filePath: string }>

/**
 * Root layout is meant to be used as top level layout for all routes of single locale.
 * That means it should be used only in /en/layout.ts, /es/layout.ts, /cs/layout.ts
 * @param param0
 * @returns
 */
export function RootLayout({ children, filePath }: RootLayoutProps) {
  console.log(filePath)
  server.setFilePath(filePath)

  const locale = server.currentLocale
  const title = `NextRoots [${locale}]`

  return (
    <html lang={locale} className="h-full">
      <head>
        <title>{title}</title>
        <meta
          name="description"
          content="Example of using next-roots to handle i18n routing in Next.js app folder."
        />
      </head>
      <body className="mx-auto flex h-full max-w-md flex-1 flex-col items-center justify-center bg-slate-900 text-slate-400">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  )
}