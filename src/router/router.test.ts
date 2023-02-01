import type { Schema } from '~/types'
import { Router } from './router'

const inputSchema: Schema = {
  cs: [
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
      name: '/(auth)/login',
      href: '/acceso',
    },
    {
      name: '/blog/articles/[articleId]',
      href: '/blog/articulos/:articleId',
    },
  ],
}

describe('getDefaultLocale', () => {
  const router = new Router(inputSchema)
  expect(router.getDefaultLocale()).toBe('cs')
})

describe('getCurrentLocale', () => {
  const router = new Router(inputSchema)
  expect(router.getCurrentLocale()).toBe('cs')
})

describe('getCurrentLocale with explicitly set', () => {
  const router = new Router(inputSchema, { currentLocale: 'es' })
  expect(router.getCurrentLocale()).toBe('es')
})

describe('getHref', () => {
  const router = new Router(inputSchema)

  const testCases = [
    ['/(auth)/login', { locale: 'cs' }, '/cs/prihlaseni'],
    ['/(auth)/login', { locale: 'es' }, '/es/acceso'],
    [
      '/blog/articles/[articleId]',
      { locale: 'cs', articleId: '1' },
      '/cs/blog/clanky/1',
    ],
    [
      '/blog/articles/[articleId]',
      { locale: 'es', articleId: '1' },
      '/es/blog/articulos/1',
    ],
    ['/(auth)/login', undefined, '/cs/prihlaseni'],
    ['/blog/articles/[articleId]', undefined, '/cs/blog/clanky/:articleId'],
  ] as const

  test.each(testCases)(
    'given %p and %p as arguments, returns %p',
    (routeName, params, expectedResult) => {
      const result = router.getHref(routeName, params)
      expect(result).toEqual(expectedResult)
    }
  )
})

describe('getHref with valid currentLocale option', () => {
  const router = new Router(inputSchema, { currentLocale: 'es' })

  const testCases = [['/(auth)/login', undefined, '/es/acceso']] as const

  test.each(testCases)(
    'given %p and %p as arguments, returns %p',
    (routeName, params, expectedResult) => {
      const result = router.getHref(routeName, params)
      expect(result).toEqual(expectedResult)
    }
  )
})

describe('getHref with invalid currentLocale option', () => {
  const router = new Router(inputSchema, { currentLocale: 'xs' })

  const testCases = [['/(auth)/login', undefined, '/cs/prihlaseni']] as const

  test.each(testCases)(
    'given %p and %p as arguments, returns %p',
    (routeName, params, expectedResult) => {
      const result = router.getHref(routeName, params)
      expect(result).toEqual(expectedResult)
    }
  )
})

describe('getRoute', () => {
  const router = new Router(inputSchema, { currentLocale: 'es' })

  const testCases = [
    ['/cs/prihlaseni', { name: '/(auth)/login', href: '/prihlaseni' }],
    ['/es/acceso', { name: '/(auth)/login', href: '/acceso' }],

    [
      '/cs/blog/clanky/1',
      {
        name: '/blog/articles/[articleId]',
        href: '/blog/clanky/:articleId',
      },
    ],
    [
      '/es/blog/articulos/1',
      {
        name: '/blog/articles/[articleId]',
        href: '/blog/articulos/:articleId',
      },
    ],
    ['/prihlaseni', undefined],
    ['', undefined],
  ] as const

  test.each(testCases)(
    'given %p as arguments, returns %p',
    (pathName, expectedResult) => {
      const result = router.getRoute(pathName)
      expect(result).toStrictEqual(expectedResult)
    }
  )
})
