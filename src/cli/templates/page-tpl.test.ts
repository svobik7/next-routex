import path from 'path'
import type { Config } from '../types'
import { compileFactory } from './page-tpl'

const defaultConfig: Config = {
  defaultLocale: '',
  locales: [],
  getCacheAbsolutePath: () => '',
  getDistAbsolutePath: () => '',
  getLocalizedAbsolutePath: () => '',
  getOriginAbsolutePath: () => '',
}

test('should create root page', () => {
  const expectedOutput = `
import RootPageOrigin from '../../roots/page'

const route = { name: '/', href: '/cs' }

export default function RootPage(props: any) {
  return <RootPageOrigin {...props} route={route} />
}
`
  const inputRewrite = {
    originPath: '/page.ts',
    localizedPath: '/cs/page.ts',
  }

  const inputConfig = {
    ...defaultConfig,
    // resolves to = /:head/app/cs/page.ts
    getLocalizedAbsolutePath: (fileName = '') =>
      path.join('/AbsolutePathHead/app', fileName),
    // resolves to = /:head/roots/page.ts
    getOriginAbsolutePath: (fileName = '') =>
      path.join('/AbsolutePathHead/roots', fileName),
  }

  const compile = compileFactory(inputConfig)
  const output = compile(inputRewrite)
  expect(output).toBe(expectedOutput)
})

test('should create page for (group) route', () => {
  const expectedOutput = `
import AuthLoginPageOrigin from '../../../../src/roots/(auth)/login/page'

const route = { name: '/(auth)/login', href: '/cs/prihlaseni' }

export default function AuthLoginPage(props: any) {
  return <AuthLoginPageOrigin {...props} route={route} />
}
`

  const inputRewrite = {
    originPath: '/(auth)/login/page.tsx',
    localizedPath: '/cs/(auth)/prihlaseni/page.tsx',
  }

  const inputConfig = {
    ...defaultConfig,
    // resolves to = /:head/app/cs/(auth)/prihlaseni/page.tsx
    getLocalizedAbsolutePath: (fileName = '') => path.join('/app', fileName),
    // resolves to = /:head/src/roots/(auth)/prihlaseni/page.tsx
    getOriginAbsolutePath: (fileName = '') => path.join('/src/roots', fileName),
  }

  const compile = compileFactory(inputConfig)
  const output = compile(inputRewrite)
  expect(output).toBe(expectedOutput)
})

test('should create page for [dynamic] route', () => {
  const expectedOutput = `
import BlogAuthorIdPageOrigin from '../../../../../roots/blog/[authorId]/page'

const route = { name: '/blog/[authorId]', href: '/cs/magazin/:authorId' }

export default function BlogAuthorIdPage(props: any) {
  return <BlogAuthorIdPageOrigin {...props} route={route} />
}
`
  const inputRewrite = {
    originPath: '/blog/[authorId]/page.ts',
    localizedPath: '/cs/magazin/[authorId]/page.ts',
  }

  const inputConfig = {
    ...defaultConfig,
    // resolves to = /:head/src/app/cs/magazin/[authorId]/page.ts
    getLocalizedAbsolutePath: (fileName = '') =>
      path.join('/src/app', fileName),
    // resolves to = /:head/roots/magazin/[authorId]/page.ts
    getOriginAbsolutePath: (fileName = '') => path.join('/roots', fileName),
  }

  const compile = compileFactory(inputConfig)
  const output = compile(inputRewrite)
  expect(output).toBe(expectedOutput)
})
