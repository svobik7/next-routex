import type { ConfigRoute, FileRoute } from '~/cli/types'
import { getFileRoutes } from './getFileRoutes'

function stringify(input: FileRoute) {
  return `${input.rootPath}:${input.routePath}`
}

const inputLocales = ['cs', 'es']
const inputRules: ConfigRoute[] = [
  {
    rootPath: 'account',
    translations: [
      { locale: 'cs', segment: 'ucet' },
      { locale: 'es', segment: 'cuenta' },
    ],
    children: [
      {
        rootPath: 'profile',
        translations: [
          // each child route takes parent path as prefix => /cs/ucet/profil or /es/cuenta/perfil
          { locale: 'cs', segment: 'profil' },
          { locale: 'es', segment: 'perfil' },
        ],
        children: [
          {
            rootPath: 'edit',
            translations: [
              // children of children routes takes all parents path as prefix => /cs/ucet/profil/upravit or /es/cuenta/perfil/editar
              { locale: 'cs', segment: 'upravit' },
              { locale: 'es', segment: 'editar' },
            ],
          },
        ],
      },
      {
        rootPath: 'settings',
        translations: [
          { locale: 'cs', segment: 'nastaveni' },
          { locale: 'es', segment: 'ajustes' },
        ],
      },
    ],
  },
  {
    rootPath: '(auth)',
    children: [
      {
        rootPath: 'login',
        translations: [
          { locale: 'cs', segment: 'prihlaseni' },
          { locale: 'es', segment: 'acceso' },
        ],
      },
      {
        rootPath: 'signup',
        translations: [
          { locale: 'cs', segment: 'registrace' },
          { locale: 'es', segment: 'registrarse' },
        ],
      },
    ],
  },
  {
    rootPath: 'blog',
    translations: [
      // empty or missing routes means that rootPath will be used for all locales
    ],
    children: [
      {
        rootPath: 'articles',
        translations: [
          { locale: 'cs', segment: 'clanky' },
          { locale: 'es', segment: 'articulos' },
        ],
        children: [
          {
            rootPath: '[articleId]',
          },
        ],
      },
      {
        rootPath: 'authors',
        translations: [
          { locale: 'cs', segment: 'autori' },
          { locale: 'es', segment: 'autores' },
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
    routes: inputRules,
    locales: inputLocales,
  })
  expect(fileRoutes.map(stringify).sort()).toEqual(
    expectedFileRoutes.map(stringify).sort()
  )
})
