import type { FileRewrite, Route } from '../../types'
import { getFilesRewrites } from './getFilesRewrites'

function stringifyRewrite(input: FileRewrite): string {
  return `from:${input.from}|to:${input.to}`
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

const expectedRewrites: FileRewrite[] = [
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
    source: '/cs/account/settings',
    from: '/cs/ucet/settings',
    to: '/cs/ucet/nastaveni',
  },
  {
    source: '/cs/account/profile/edit',
    from: '/cs/ucet/profil/edit',
    to: '/cs/ucet/profil/upravit',
  },
  {
    source: '/es/account',
    from: '/es/account',
    to: '/es/cuenta',
  },
  {
    source: '/es/account/profile',
    from: '/es/cuenta/profile',
    to: '/es/cuenta/perfil',
  },
  {
    source: '/es/account/profile/edit',
    from: '/es/cuenta/perfil/edit',
    to: '/es/cuenta/perfil/editar',
  },
  {
    source: '/es/account/settings',
    from: '/es/cuenta/settings',
    to: '/es/cuenta/ajustes',
  },
  {
    source: '/cs/auth/login',
    from: '/cs/auth/login',
    to: '/cs/auth/prihlaseni',
  },
  {
    source: '/cs/auth/signup',
    from: '/cs/auth/signup',
    to: '/cs/auth/registrace',
  },
  { source: '/es/auth/login', from: '/es/auth/login', to: '/es/auth/acceso' },
  {
    source: '/es/auth/signup',
    from: '/es/auth/signup',
    to: '/es/auth/registrarse',
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
    source: '/cs/blog/authors',
    from: '/cs/magazin/authors',
    to: '/cs/magazin/autori',
  },
  {
    source: '/es/blog',
    from: '/es/blog',
    to: '/es/revista',
  },
  {
    source: '/es/blog/articles',
    from: '/es/revista/articles',
    to: '/es/revista/articulos',
  },
  {
    source: '/es/blog/authors',
    from: '/es/revista/authors',
    to: '/es/revista/autores',
  },
]

test('should create routing rewrites', () => {
  const fileRewrites = getFilesRewrites({
    routes: inputRoutes,
    locales: inputLocales,
  })
  expect(fileRewrites.map(stringifyRewrite).sort()).toEqual(
    expectedRewrites.map(stringifyRewrite).sort()
  )
})
