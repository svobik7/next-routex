import type { ReactNode } from 'react'
import { router } from '~/config'

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const title = `[${router.getCurrentLocale()}] NextRoutex for Next.js 13`

  return (
    <html>
      <head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
