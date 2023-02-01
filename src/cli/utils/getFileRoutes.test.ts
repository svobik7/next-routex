import type { ConfigRule, FileRoute } from '~/cli/types'
import { getFileRoutes } from './getFileRoutes'

function stringify(input: FileRoute) {
  return `${input.rootPath}:${input.routePath}`
}

const inputLocales = ['cs', 'es']
const inputRules: ConfigRule[] = [
  {
    rootPath: 'account',
    routes: [
      { locale: 'cs', routePath: 'ucet' },
      { locale: 'es', routePath: 'cuenta' },
    ],
    children: [
      {
        rootPath: 'profile',
        routes: [
          // each child route takes parent path as prefix => /cs/ucet/profil or /es/cuenta/perfil
          { locale: 'cs', routePath: 'profil' },
          { locale: 'es', routePath: 'perfil' },
        ],
        children: [
          {
            rootPath: 'edit',
            routes: [
              // children of children routes takes all parents path as prefix => /cs/ucet/profil/upravit or /es/cuenta/perfil/editar
              { locale: 'cs', routePath: 'upravit' },
              { locale: 'es', routePath: 'editar' },
            ],
          },
        ],
      },
      {
        rootPath: 'settings',
        routes: [
          { locale: 'cs', routePath: 'nastaveni' },
          { locale: 'es', routePath: 'ajustes' },
        ],
      },
    ],
  },
  {
    rootPath: '(auth)',
    children: [
      {
        rootPath: 'login',
        routes: [
          { locale: 'cs', routePath: 'prihlaseni' },
          { locale: 'es', routePath: 'acceso' },
        ],
      },
      {
        rootPath: 'signup',
        routes: [
          { locale: 'cs', routePath: 'registrace' },
          { locale: 'es', routePath: 'registrarse' },
        ],
      },
    ],
  },
  {
    rootPath: 'blog',
    routes: [
      // empty or missing routes means that rootPath will be used for all locales
    ],
    children: [
      {
        rootPath: 'articles',
        routes: [
          { locale: 'cs', routePath: 'clanky' },
          { locale: 'es', routePath: 'articulos' },
        ],
        children: [
          {
            rootPath: '[articleId]',
          },
        ],
      },
      {
        rootPath: 'authors',
        routes: [
          { locale: 'cs', routePath: 'autori' },
          { locale: 'es', routePath: 'autores' },
        ],
        children: [
          {
            rootPath: '[authorId]',
          },
        ],
      },
    ],
  },
]

const expectedFileRoutes: FileRoute[] = [
  { rootPath: '/cs/account', routePath: '/cs/ucet' },
  { rootPath: '/es/account', routePath: '/es/cuenta' },
  {
    rootPath: '/cs/account/profile',
    routePath: '/cs/ucet/profil',
  },
  {
    rootPath: '/es/account/profile',
    routePath: '/es/cuenta/perfil',
  },
  {
    rootPath: '/cs/account/profile/edit',
    routePath: '/cs/ucet/profil/upravit',
  },
  {
    rootPath: '/es/account/profile/edit',
    routePath: '/es/cuenta/perfil/editar',
  },
  {
    rootPath: '/cs/account/settings',
    routePath: '/cs/ucet/nastaveni',
  },
  {
    rootPath: '/es/account/settings',
    routePath: '/es/cuenta/ajustes',
  },
  {
    rootPath: '/cs/(auth)',
    routePath: '/cs/(auth)',
  },
  {
    rootPath: '/es/(auth)',
    routePath: '/es/(auth)',
  },
  {
    rootPath: '/cs/(auth)/login',
    routePath: '/cs/(auth)/prihlaseni',
  },
  { rootPath: '/es/(auth)/login', routePath: '/es/(auth)/acceso' },
  {
    rootPath: '/cs/(auth)/signup',
    routePath: '/cs/(auth)/registrace',
  },
  {
    rootPath: '/es/(auth)/signup',
    routePath: '/es/(auth)/registrarse',
  },
  {
    rootPath: '/cs/blog',
    routePath: '/cs/blog',
  },
  {
    rootPath: '/es/blog',
    routePath: '/es/blog',
  },
  {
    rootPath: '/cs/blog/articles',
    routePath: '/cs/blog/clanky',
  },
  {
    rootPath: '/es/blog/articles',
    routePath: '/es/blog/articulos',
  },
  {
    rootPath: '/cs/blog/articles/[articleId]',
    routePath: '/cs/blog/clanky/[articleId]',
  },
  {
    rootPath: '/es/blog/articles/[articleId]',
    routePath: '/es/blog/articulos/[articleId]',
  },
  {
    rootPath: '/cs/blog/authors',
    routePath: '/cs/blog/autori',
  },
  {
    rootPath: '/es/blog/authors',
    routePath: '/es/blog/autores',
  },
  {
    rootPath: '/cs/blog/authors/[authorId]',
    routePath: '/cs/blog/autori/[authorId]',
  },
  {
    rootPath: '/es/blog/authors/[authorId]',
    routePath: '/es/blog/autores/[authorId]',
  },
]

test('should create file routes', () => {
  const fileRoutes = getFileRoutes({
    rules: inputRules,
    locales: inputLocales,
  })
  expect(fileRoutes.map(stringify).sort()).toEqual(
    expectedFileRoutes.map(stringify).sort()
  )
})
