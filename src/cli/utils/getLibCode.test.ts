import type { Schema } from '~/types'
import { getLibCode } from './getLibCode'

const inputSchema: Schema = new Map([
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
        {
          name: '/blog/authors/[authorId]',
          href: '/blog/autori/:authorId',
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
        {
          name: '/blog/authors/[authorId]',
          href: '/blog/authores/:authorId',
        },
      ],
    },
  ],
])

const expectedOutput = `
const schema = new Map(${JSON.stringify([
  [
    'cs',
    {
      locale: 'cs',
      routes: [
        { name: '/account', href: '/ucet' },
        { name: '/(auth)/login', href: '/prihlaseni' },
        { name: '/blog/articles/[articleId]', href: '/blog/clanky/:articleId' },
        { name: '/blog/authors/[authorId]', href: '/blog/autori/:authorId' },
      ],
    },
  ],
  [
    'es',
    {
      locale: 'es',
      routes: [
        { name: '/account', href: '/cuenta' },
        { name: '/(auth)/login', href: '/acceso' },
        {
          name: '/blog/articles/[articleId]',
          href: '/blog/articulos/:articleId',
        },
        { name: '/blog/authors/[authorId]', href: '/blog/authores/:authorId' },
      ],
    },
  ],
])});
schema.set("__default", schema.entries().next().value[1]);
module.exports = schema;
`

test('should create lib code', () => {
  const code = getLibCode(inputSchema)
  expect(code).toBe(expectedOutput)
})
