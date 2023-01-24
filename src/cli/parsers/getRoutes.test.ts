import type { Rewrite, Route } from '../../types'
import { getRoutes } from './getRoutes'

function stringify(input: Route): string {
  return `${input.id}:${input.href}`
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
  },
  {
    originPath: '/es/(auth)',
    lintelPath: '/es/(auth)',
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

const expectedRoutes: Route[] = [
  {
    id: '/cs/account',
    href: '/cs/ucet',
  },
  {
    id: '/cs/account/profile',
    href: '/cs/ucet/profil',
  },
  {
    id: '/cs/account/settings',
    href: '/cs/ucet/nastaveni',
  },
  {
    id: '/cs/account/profile/edit',
    href: '/cs/ucet/profil/upravit',
  },
  {
    id: '/es/account',
    href: '/es/cuenta',
  },
  {
    id: '/es/account/profile',
    href: '/es/cuenta/perfil',
  },
  {
    id: '/es/account/profile/edit',
    href: '/es/cuenta/perfil/editar',
  },
  {
    id: '/es/account/settings',
    href: '/es/cuenta/ajustes',
  },
  {
    id: '/cs/(auth)/login',
    href: '/cs/prihlaseni',
  },
  {
    id: '/cs/(auth)/signup',
    href: '/cs/registrace',
  },
  {
    id: '/es/(auth)/login',
    href: '/es/acceso',
  },
  {
    id: '/es/(auth)/signup',
    href: '/es/registrarse',
  },
  {
    id: '/cs/blog',
    href: '/cs/blog',
  },
  {
    id: '/cs/blog/articles',
    href: '/cs/blog/clanky',
  },
  {
    id: '/cs/blog/authors',
    href: '/cs/blog/autori',
  },
  {
    id: '/es/blog',
    href: '/es/blog',
  },
  {
    id: '/es/blog/articles',
    href: '/es/blog/articulos',
  },
  {
    id: '/es/blog/authors',
    href: '/es/blog/autores',
  },
]

test('should create routing rewrites', () => {
  const routes = getRoutes(inputRewrites)
  expect(routes.map(stringify).sort()).toEqual(
    expectedRoutes.map(stringify).sort()
  )
})
