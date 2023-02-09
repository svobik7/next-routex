import type { Schema } from '~/types'
import type { FileRoute } from '../types'
import { getSchema } from './getSchema'

const inputFileRoutes: FileRoute[] = [
  { rootPath: '/cs/account', routePath: '/cs/ucet' },
  { rootPath: '/es/account', routePath: '/es/cuenta' },
  {
    rootPath: '/cs/(auth)/login',
    routePath: '/cs/(auth)/prihlaseni',
  },
  { rootPath: '/es/(auth)/login', routePath: '/es/(auth)/acceso' },
  {
    rootPath: '/cs/blog/articles/[articleId]',
    routePath: '/cs/blog/clanky/[articleId]',
  },
  {
    rootPath: '/es/blog/articles/[articleId]',
    routePath: '/es/blog/articulos/[articleId]',
  },
]

const expectedSchema: Schema = new Map([
  [
    'cs',
    {
      locale: 'cs',
      routes: [
        {
          name: '/account',
          href: '/ucet',
        },
        {
          name: '/(auth)/login',
          href: '/prihlaseni',
        },
        {
          name: '/blog/articles/[articleId]',
          href: '/blog/clanky/:articleId',
        },
      ],
    },
  ],
  [
    'es',
    {
      locale: 'es',
      routes: [
        {
          name: '/account',
          href: '/cuenta',
        },
        {
          name: '/(auth)/login',
          href: '/acceso',
        },
        {
          name: '/blog/articles/[articleId]',
          href: '/blog/articulos/:articleId',
        },
      ],
    },
  ],
])

test('should create schema', () => {
  const schema = getSchema(inputFileRoutes)
  expect(schema).toEqual(expectedSchema)
})
