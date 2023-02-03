import type { FileRewrite, FileRoute } from '~/cli/types'
import { getFileRewrites } from './getFileRewrites'

function stringify(input: FileRewrite): string {
  return `source:${input.source}|from:${input.from}|to:${input.to}`
}

const inputFileRoutes: FileRoute[] = [
  { rootPath: '/cs/account', routePath: '/cs/ucet' },
  { rootPath: '/cs/account/profile', routePath: '/cs/ucet/profil' },
  {
    rootPath: '/cs/(auth)',
    routePath: '/cs/(auth)',
  },
  {
    rootPath: '/cs/(auth)/login',
    routePath: '/cs/(auth)/prihlaseni',
  },
  {
    rootPath: '/cs/blog',
    routePath: '/cs/magazin',
  },
  {
    rootPath: '/cs/blog/articles',
    routePath: '/cs/magazin/clanky',
  },
  {
    rootPath: '/cs/blog/articles/[articleId]',
    routePath: '/cs/magazin/clanky/[articleId]',
  },
]

const expectedFiles: FileRewrite[] = [
  {
    source: '/cs/account',
    from: '/cs/account',
    to: '/cs/ucet',
  },
  {
    source: '/cs/account/profile',
    from: '/cs/ucet/profile',
    to: '/cs/ucet/profil',
  },
  {
    source: '/cs/(auth)',
    from: '/cs/(auth)',
    to: '/cs/(auth)',
  },
  {
    source: '/cs/(auth)/login',
    from: '/cs/(auth)/login',
    to: '/cs/(auth)/prihlaseni',
  },
  {
    source: '/cs/blog',
    from: '/cs/blog',
    to: '/cs/magazin',
  },
  {
    source: '/cs/blog/articles',
    from: '/cs/magazin/articles',
    to: '/cs/magazin/clanky',
  },
  {
    source: '/cs/blog/articles/[articleId]',
    from: '/cs/magazin/clanky/[articleId]',
    to: '/cs/magazin/clanky/[articleId]',
  },
]

test('should create file rewrites', () => {
  const fileRewrites = getFileRewrites(inputFileRoutes)
  expect(fileRewrites.map(stringify).sort()).toEqual(
    expectedFiles.map(stringify).sort()
  )
})
