import type { ConfigRule, Rewrite } from '../../types'
import { getRewrites } from './getRewrites'

function stringifyRewrite(input: Rewrite) {
  return `${input.originPath}:${input.lintelPath}:${
    input.noRoute ? 'noRoute' : 'route'
  }`
}

const inputLocales = ['cs', 'es']
const inputRules: ConfigRule[] = [
  {
    originPath: 'account',
    lintels: [
      { locale: 'cs', lintelPath: 'ucet' },
      { locale: 'es', lintelPath: 'cuenta' },
    ],
    children: [
      {
        originPath: 'profile',
        lintels: [
          // each child lintel takes parent path as prefix = /cs/ucet/profil or /es/cuenta/perfil
          { locale: 'cs', lintelPath: 'profil' },
          { locale: 'es', lintelPath: 'perfil' },
        ],
        children: [
          {
            originPath: 'edit',
            lintels: [
              // children of children lintel takes all parents path as prefix = /cs/ucet/profil/upravit or /es/cuenta/perfil/editar
              { locale: 'cs', lintelPath: 'upravit' },
              { locale: 'es', lintelPath: 'editar' },
            ],
          },
        ],
      },
      {
        originPath: 'settings',
        lintels: [
          { locale: 'cs', lintelPath: 'nastaveni' },
          { locale: 'es', lintelPath: 'ajustes' },
        ],
      },
    ],
  },
  {
    originPath: '(auth)',
    children: [
      {
        originPath: 'login',
        lintels: [
          { locale: 'cs', lintelPath: 'prihlaseni' },
          { locale: 'es', lintelPath: 'acceso' },
        ],
      },
      {
        originPath: 'signup',
        lintels: [
          { locale: 'cs', lintelPath: 'registrace' },
          { locale: 'es', lintelPath: 'registrarse' },
        ],
      },
    ],
  },
  {
    originPath: 'blog',
    lintels: [
      // empty or missing lintels means that originPath will be used as lintelPath for all locales
    ],
    children: [
      {
        originPath: 'articles',
        lintels: [
          { locale: 'cs', lintelPath: 'clanky' },
          { locale: 'es', lintelPath: 'articulos' },
        ],
        // there is no need to add children for [articlesId] page as that does not need to be translated
      },
      {
        originPath: 'authors',
        lintels: [
          { locale: 'cs', lintelPath: 'autori' },
          { locale: 'es', lintelPath: 'autores' },
        ],
        // there is no need to add children for [authorsId] page as that does not need to be translated
      },
    ],
  },
]

const expectedRewrites: Rewrite[] = [
  { originPath: '/cs/account', lintelPath: '/cs/ucet' },
  { originPath: '/es/account', lintelPath: '/es/cuenta' },
  {
    originPath: '/cs/account/profile',
    lintelPath: '/cs/ucet/profil',
  },
  {
    originPath: '/es/account/profile',
    lintelPath: '/es/cuenta/perfil',
  },
  {
    originPath: '/cs/account/profile/edit',
    lintelPath: '/cs/ucet/profil/upravit',
  },
  {
    originPath: '/es/account/profile/edit',
    lintelPath: '/es/cuenta/perfil/editar',
  },
  {
    originPath: '/cs/account/settings',
    lintelPath: '/cs/ucet/nastaveni',
  },
  {
    originPath: '/es/account/settings',
    lintelPath: '/es/cuenta/ajustes',
  },
  {
    originPath: '/cs/(auth)',
    lintelPath: '/cs/(auth)',
    noRoute: true,
  },
  {
    originPath: '/es/(auth)',
    lintelPath: '/es/(auth)',
    noRoute: true,
  },
  {
    originPath: '/cs/(auth)/login',
    lintelPath: '/cs/(auth)/prihlaseni',
  },
  { originPath: '/es/(auth)/login', lintelPath: '/es/(auth)/acceso' },
  {
    originPath: '/cs/(auth)/signup',
    lintelPath: '/cs/(auth)/registrace',
  },
  {
    originPath: '/es/(auth)/signup',
    lintelPath: '/es/(auth)/registrarse',
  },
  {
    originPath: '/cs/blog',
    lintelPath: '/cs/blog',
  },
  {
    originPath: '/es/blog',
    lintelPath: '/es/blog',
  },
  {
    originPath: '/cs/blog/articles',
    lintelPath: '/cs/blog/clanky',
  },
  {
    originPath: '/es/blog/articles',
    lintelPath: '/es/blog/articulos',
  },
  {
    originPath: '/cs/blog/authors',
    lintelPath: '/cs/blog/autori',
  },
  {
    originPath: '/es/blog/authors',
    lintelPath: '/es/blog/autores',
  },
]

test('should create routing rewrites', () => {
  const rewrites = getRewrites({
    rules: inputRules,
    locales: inputLocales,
  })
  expect(rewrites.map(stringifyRewrite).sort()).toEqual(
    expectedRewrites.map(stringifyRewrite).sort()
  )
})
