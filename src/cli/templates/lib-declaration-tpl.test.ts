import type { RouterSchema } from '~/types'
import { compile } from './lib-declaration-tpl'

const inputSchema: RouterSchema = {
  defaultLocale: 'cs',
  locales: ['cs', 'es'],
  routes: {
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
  },
}

const expectedOutput = `
export type RouteLocale = 'cs' | 'es';
export type RouteNameStatic = '/account' | '/(auth)/login';
export type RouteNameDynamic = '/blog/articles/[articleId]' | '/blog/authors/[authorId]';
export type RouteName = RouteNameStatic | RouteNameDynamic;
export type Route = { name: RouteName; href: \`/\${string}\` };
export type Schema = { defaultLocale: string, locales: string[], routes: Record<RouteLocale, Route[]> };

export type RouteParamsStatic<T extends object = object> = T & { locale?: RouteLocale };
export type RouteParamsDynamic<T extends RouteName> = T extends '/blog/articles/[articleId]' ? RouteParamsStatic<{articleId:string}> : T extends '/blog/authors/[authorId]' ? RouteParamsStatic<{authorId:string}> : RouteParamsStatic;

export class Router {
  constructor(schema: Schema)
  
  setLocation(href: string): void
  
  getHref<T extends RouteNameDynamic>(name: T, params: RouteParamsDynamic<T>): string
  getHref<T extends RouteNameStatic>(name: T): string
  getHref<T extends RouteNameStatic>(name: T, params: RouteParamsStatic): string

  getHrefLocale(href: string): string
  
  getRouteByHref(href: string): Route | undefined
}

export const schema: Schema;
`

test('should create lib declaration', () => {
  const declaration = compile(inputSchema)
  expect(declaration).toBe(expectedOutput)
})
