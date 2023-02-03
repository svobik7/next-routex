import type { PropsWithChildren } from 'react'
import { getRouter } from '~/config/router'

import '~/styles.css'

type LayoutProps = PropsWithChildren

export function Layout({ children }: LayoutProps) {
  const router = getRouter()
  const title = `NextRoutex [${router.getLocale()}]`

  return (
    <html>
      <head>
        <title>{title}</title>
        <meta
          name="description"
          content="Example of using next-routex to handle i18n routing in Next.js app folder."
        />
      </head>
      <body className="bg-slate-900 text-slate-400">{children}</body>
    </html>
  )
}
