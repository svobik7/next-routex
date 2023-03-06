import type { RouterSchema } from '~/types'
import { Router } from './router'

const inputSchema: RouterSchema = {
  locales: ['es', 'cs'],
  defaultLocale: 'es',
  prefixDefaultLocale: false,
  routes: {
    es: [
      {
        name: '/(auth)/login',
        href: '/acceso',
      },
      {
        name: '/blog/articles/[articleId]',
        href: '/blog/articulos/:articleId',
      },
    ],
    cs: [
      {
        name: '/(auth)/login',
        href: '/cs/prihlaseni',
      },
      {
        name: '/blog/articles/[articleId]',
        href: '/cs/blog/clanky/:articleId',
      },
    ],
  },
}

describe('Router without default prefix', () => {

  describe('getHref', () => {
    const router = new Router(inputSchema)

    const testCases = [
      ['/(auth)/login', { locale: 'cs' }, '/cs/prihlaseni'],
      ['/(auth)/login', { locale: 'es' }, '/acceso'],
      ['/(auth)/login', { locale: 'invalid' }, '/'],
      [
        '/blog/articles/[articleId]',
        { locale: 'cs', articleId: '1' },
        '/cs/blog/clanky/1',
      ],
      [
        '/blog/articles/[articleId]',
        { locale: 'es', articleId: '1' },
        '/blog/articulos/1',
      ],
      ['/(auth)/login', undefined, '/acceso'],
      ['/blog/articles/[articleId]', undefined, '/blog/articulos/:articleId'],
    ] as const

    test.each(testCases)(
      'given %s and %o as arguments, returns %s',
      (routeName, params, expectedResult) => {
        const result = router.getHref(routeName, params)
        expect(result).toEqual(expectedResult)
      }
    )
  })

  describe('getHrefLocale', () => {
    const router = new Router(inputSchema)

    const testCases = [
      ['/cs/login', 'cs'],
      ['/login', 'es'],
    ] as const

    test.each(testCases)('given %s and returns %s', (href, expectedResult) => {
      const result = router.getLocaleFromHref(href)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getRouteByHref', () => {
    const router = new Router(inputSchema)

    const testCases = [
      ['/cs/prihlaseni', { name: '/(auth)/login', href: '/cs/prihlaseni' }],
      ['/acceso', { name: '/(auth)/login', href: '/acceso' }],
      [
        '/cs/blog/clanky/1',
        {
          name: '/blog/articles/[articleId]',
          href: '/cs/blog/clanky/:articleId',
        },
      ],
      [
        '/blog/articulos/1',
        {
          name: '/blog/articles/[articleId]',
          href: '/blog/articulos/:articleId',
        },
      ],
      ['/prihlaseni', undefined],
      ['/es/blog/articulos/1', undefined],
      ['', undefined],
    ] as const

    test.each(testCases)(
      'given %s as arguments, returns %o',
      (pathName, expectedResult) => {
        const result = router.getRouteFromHref(pathName)
        expect(result).toStrictEqual(expectedResult)
      }
    )
  })
})
