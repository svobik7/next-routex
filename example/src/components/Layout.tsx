/* eslint-disable @next/next/no-head-element */
import type { PropsWithChildren } from 'react'
import { getRouter } from '~/config/router'
import { SelectLocale } from './SelectLocale/SeletLocale'

import '~/styles.css'

type LayoutProps = PropsWithChildren

export function Layout({ children }: LayoutProps) {
  const router = getRouter()
  const title = `NextRoutex [${router.getLocale()}]`

  return (
    <html className="h-full">
      <head>
        <title>{title}</title>
        <meta
          name="description"
          content="Example of using next-routex to handle i18n routing in Next.js app folder."
        />
      </head>
      <body className="mx-auto flex h-full max-w-md flex-1 flex-col items-center justify-center bg-slate-900 text-slate-400">
        <SelectLocale />
        {children}
      </body>
    </html>
  )
}
