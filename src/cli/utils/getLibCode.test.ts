import type { Schema } from '~/types'
import { getLibCode } from './getLibCode'

const inputRoutingTable: Schema = {
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
    {
      name: '/blog/authors/[authorId]',
      href: '/blog/autori/:authorId',
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
    {
      name: '/blog/authors/[authorId]',
      href: '/blog/authores/:authorId',
    },
  ],
}

const expectedOutput = `
const schema = {"cs":[{"name":"/account","href":"/ucet"},{"name":"/(auth)/login","href":"/prihlaseni"},{"name":"/blog/articles/[articleId]","href":"/blog/clanky/:articleId"},{"name":"/blog/authors/[authorId]","href":"/blog/autori/:authorId"}],"es":[{"name":"/account","href":"/cuenta"},{"name":"/(auth)/login","href":"/acceso"},{"name":"/blog/articles/[articleId]","href":"/blog/articulos/:articleId"},{"name":"/blog/authors/[authorId]","href":"/blog/authores/:authorId"}]}
module.exports = { schema }
`

test('should create lib code', () => {
  const code = getLibCode(inputRoutingTable)
  expect(code).toBe(expectedOutput)
})
