import type { Route, RouteRewrite } from '../../types'
import { getRoutesRewrites } from './getRoutesRewrites'

function stringifyRewrite(input: RouteRewrite) {
  return `${input.depth}:${input.locale}:${input.path}:${input.href}`
}

const inputLocales = ['cs', 'es']
const inputRoutes: Route[] = [
  {
    path: 'account',
    variants: [
      { locale: 'cs', href: 'ucet' },
      { locale: 'es', href: 'cuenta' },
    ],
    children: [
      {
        path: 'profile',
        variants: [
          // children variant takes parent path as prefix = /cs/ucet/profil or /es/cuenta/perfil
          { locale: 'cs', href: 'profil' },
          { locale: 'es', href: 'perfil' },
        ],
        children: [
          {
            path: 'edit',
            variants: [
              // children of children variant takes all parents path as prefix = /cs/ucet/profil/upravit or /es/cuenta/perfil/editar
              { locale: 'cs', href: 'upravit' },
              { locale: 'es', href: 'editar' },
            ],
          },
        ],
      },
      {
        path: 'settings',
        variants: [
          { locale: 'cs', href: 'nastaveni' },
          { locale: 'es', href: 'ajustes' },
        ],
      },
    ],
  },
  {
    path: 'auth',
    variants: [
      // empty or missing variant means that "auth" path will be used as translated href for that particular missing locale
    ],
    isShadowRoute: true,
    children: [
      {
        path: 'login',
        variants: [
          { locale: 'cs', href: 'prihlaseni' },
          { locale: 'es', href: 'acceso' },
        ],
      },
      {
        path: 'signup',
        variants: [
          { locale: 'cs', href: 'registrace' },
          { locale: 'es', href: 'registrarse' },
        ],
      },
    ],
  },
  {
    path: 'blog',
    variants: [
      { locale: 'cs', href: 'magazin' },
      { locale: 'es', href: 'revista' },
    ],
    children: [
      {
        path: 'articles',
        variants: [
          { locale: 'cs', href: 'clanky' },
          { locale: 'es', href: 'articulos' },
        ],
        // there is no need to add children for [articlesId] page as that does not need to be translated
      },
      {
        path: 'authors',
        variants: [
          { locale: 'cs', href: 'autori' },
          { locale: 'es', href: 'autores' },
        ],
        // there is no need to add children for [authorsId] page as that does not need to be translated
      },
    ],
  },
]

const expectedRewrites: RouteRewrite[] = [
  { path: '/cs/account', href: '/cs/ucet', depth: 0, locale: 'cs' },
  { path: '/es/account', href: '/es/cuenta', depth: 0, locale: 'es' },
  {
    path: '/cs/account/profile',
    href: '/cs/ucet/profil',
    depth: 1,
    locale: 'cs',
  },
  {
    path: '/es/account/profile',
    href: '/es/cuenta/perfil',
    depth: 1,
    locale: 'es',
  },
  {
    path: '/cs/account/profile/edit',
    href: '/cs/ucet/profil/upravit',
    depth: 2,
    locale: 'cs',
  },
  {
    path: '/es/account/profile/edit',
    href: '/es/cuenta/perfil/editar',
    depth: 2,
    locale: 'es',
  },
  {
    path: '/cs/account/settings',
    href: '/cs/ucet/nastaveni',
    depth: 1,
    locale: 'cs',
  },
  {
    path: '/es/account/settings',
    href: '/es/cuenta/ajustes',
    depth: 1,
    locale: 'es',
  },
  {
    path: '/cs/auth/login',
    href: '/cs/auth/prihlaseni',
    depth: 1,
    locale: 'cs',
  },
  { path: '/es/auth/login', href: '/es/auth/acceso', depth: 1, locale: 'es' },
  {
    path: '/cs/auth/signup',
    href: '/cs/auth/registrace',
    depth: 1,
    locale: 'cs',
  },
  {
    path: '/es/auth/signup',
    href: '/es/auth/registrarse',
    depth: 1,
    locale: 'es',
  },
  { path: '/cs/blog', href: '/cs/magazin', depth: 0, locale: 'cs' },
  { path: '/es/blog', href: '/es/revista', depth: 0, locale: 'es' },
  {
    path: '/cs/blog/articles',
    href: '/cs/magazin/clanky',
    depth: 1,
    locale: 'cs',
  },
  {
    path: '/es/blog/articles',
    href: '/es/revista/articulos',
    depth: 1,
    locale: 'es',
  },
  {
    path: '/cs/blog/authors',
    href: '/cs/magazin/autori',
    depth: 1,
    locale: 'cs',
  },
  {
    path: '/es/blog/authors',
    href: '/es/revista/autores',
    depth: 1,
    locale: 'es',
  },
]

test('should create routing rewrites', () => {
  const routeRewrites = getRoutesRewrites({
    routes: inputRoutes,
    locales: inputLocales,
  })
  expect(routeRewrites.map(stringifyRewrite).sort()).toEqual(
    expectedRewrites.map(stringifyRewrite).sort()
  )
})
