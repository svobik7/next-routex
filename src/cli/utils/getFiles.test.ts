import type { File, ConfigRule, Rewrite } from '../../types'
import { getFiles } from './getFiles'

function stringifyRewrite(input: File): string {
  return `source:${input.source}|from:${input.from}|to:${input.to}`
}

const inputRewrites: Rewrite[] = [
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

const expectedFiles: File[] = [
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
    source: '/cs/(auth)',
    from: '/cs/(auth)',
    to: '/cs/(auth)',
  },
  {
    source: '/cs/(auth)/login',
    from: '/cs/(auth)/login',
    to: '/cs/(auth)/prihlaseni',
  },
  {
    source: '/cs/(auth)/signup',
    from: '/cs/(auth)/signup',
    to: '/cs/(auth)/registrace',
  },
  {
    source: '/es/(auth)',
    from: '/es/(auth)',
    to: '/es/(auth)',
  },
  {
    source: '/es/(auth)/login',
    from: '/es/(auth)/login',
    to: '/es/(auth)/acceso',
  },
  {
    source: '/es/(auth)/signup',
    from: '/es/(auth)/signup',
    to: '/es/(auth)/registrarse',
  },
  {
    source: '/cs/blog',
    from: '/cs/blog',
    to: '/cs/blog',
  },
  {
    source: '/cs/blog/articles',
    from: '/cs/blog/articles',
    to: '/cs/blog/clanky',
  },
  {
    source: '/cs/blog/authors',
    from: '/cs/blog/authors',
    to: '/cs/blog/autori',
  },
  {
    source: '/es/blog',
    from: '/es/blog',
    to: '/es/blog',
  },
  {
    source: '/es/blog/articles',
    from: '/es/blog/articles',
    to: '/es/blog/articulos',
  },
  {
    source: '/es/blog/authors',
    from: '/es/blog/authors',
    to: '/es/blog/autores',
  },
]

test('should create routing rewrites', () => {
  const fileRewrites = getFiles(inputRewrites)
  expect(fileRewrites.map(stringifyRewrite).sort()).toEqual(
    expectedFiles.map(stringifyRewrite).sort()
  )
})
