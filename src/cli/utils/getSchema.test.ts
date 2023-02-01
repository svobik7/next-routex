import type { Route, Schema } from '~/types'
import type { FileRoute } from '../types'
import { getSchema } from './getSchema'

function stringifyRoute(route: Route) {
  return `${route.name}:${route.href}`
}

function stringifySchema(schema: Schema) {
  const sortedLocales = Object.keys(schema).sort()
  const sortedRecords = (locale: string) =>
    schema[locale].map(stringifyRoute).sort()
  return sortedLocales.map(sortedRecords)
}

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

const expectedSchema: Schema = {
  cs: [
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
  es: [
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
}

test('should create routing table', () => {
  const schema = getSchema(inputFileRoutes)
  expect(stringifySchema(schema)).toEqual(stringifySchema(expectedSchema))
})
