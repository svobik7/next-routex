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
  getOriginContents: () => '',
}

test('should create root page', () => {
  const expectedOutput = `
import RootPageOrigin from '../../roots/page'

export default function RootPage(props: any) {
  return <RootPageOrigin {...props} pageHref="/cs" />
}
`
  const inputRewrite = {
    originPath: '/page.ts',
    localizedPath: '/cs/page.ts',
  }

  const inputConfig = {
    ...defaultConfig,
    // resolves to = /AbsolutePathHead/app/cs/page.ts
    getLocalizedAbsolutePath: (fileName = '') =>
      path.join('/AbsolutePathHead/app', fileName),
    // resolves to = /AbsolutePathHead/roots/page.ts
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

export default function AuthLoginPage(props: any) {
  return <AuthLoginPageOrigin {...props} pageHref="/cs/prihlaseni" />
}
`

  const inputRewrite = {
    originPath: '/(auth)/login/page.tsx',
    localizedPath: '/cs/(auth)/prihlaseni/page.tsx',
  }

  const inputConfig = {
    ...defaultConfig,
    // resolves to = /app/cs/(auth)/prihlaseni/page.tsx
    getLocalizedAbsolutePath: (fileName = '') => path.join('/app', fileName),
    // resolves to = /src/roots/(auth)/prihlaseni/page.tsx
    getOriginAbsolutePath: (fileName = '') => path.join('/src/roots', fileName),
  }

  const compile = compileFactory(inputConfig)
  const output = compile(inputRewrite)
  expect(output).toBe(expectedOutput)
})

test('should create page for [dynamic] route', () => {
  const expectedOutput = `
import BlogAuthorIdPageOrigin from '../../../../../roots/blog/[authorId]/page'
import { compileHref } from 'next-roots'

export default function BlogAuthorIdPage({ params, ...otherProps }: any) {
  return <BlogAuthorIdPageOrigin {...otherProps} params={params} pageHref={compileHref('/cs/magazin/:authorId', params)} />
}
`
  const inputRewrite = {
    originPath: '/blog/[authorId]/page.ts',
    localizedPath: '/cs/magazin/[authorId]/page.ts',
  }

  const inputConfig = {
    ...defaultConfig,
    // resolves to = /src/app/cs/magazin/[authorId]/page.ts
    getLocalizedAbsolutePath: (fileName = '') =>
      path.join('/src/app', fileName),
    // resolves to = /roots/magazin/[authorId]/page.ts
    getOriginAbsolutePath: (fileName = '') => path.join('/roots', fileName),
  }

  const compile = compileFactory(inputConfig)
  const output = compile(inputRewrite)
  expect(output).toBe(expectedOutput)
})

test('should create page with static metadata object', () => {
  const expectedOutput = `
import StaticMetaDataPageOrigin from '..'

export default function StaticMetaDataPage(props: any) {
  return <StaticMetaDataPageOrigin {...props} pageHref="/cs/static-meta-data" />
}

export { metadata } from '..'
`
  const inputRewrite = {
    originPath: '/static-meta-data/page.ts',
    localizedPath: '/cs/static-meta-data/page.ts',
  }

  const inputConfig: Config = {
    ...defaultConfig,
    getOriginContents: () =>
      `export const metadata = { title: "Static Title" }`,
  }

  const compile = compileFactory(inputConfig)
  const output = compile(inputRewrite)
  expect(output).toBe(expectedOutput)
})

test('should create page with dynamic metadata function', () => {
  const expectedOutput = `
import DynamicMetaDataPageOrigin from '..'

export default function DynamicMetaDataPage(props: any) {
  return <DynamicMetaDataPageOrigin {...props} pageHref="/cs/dynamic-meta-data" />
}

export { generateMetadata } from '..'
`
  const inputRewrite = {
    originPath: '/dynamic-meta-data/page.ts',
    localizedPath: '/cs/dynamic-meta-data/page.ts',
  }

  const inputConfig: Config = {
    ...defaultConfig,
    getOriginContents: () => `export async function generateMetadata() {}`,
  }

  const compile = compileFactory(inputConfig)
  const output = compile(inputRewrite)
  expect(output).toBe(expectedOutput)
})

test('should create page with generate static params function', () => {
  const expectedOutput = `
import GenerateStaticParamsPageOrigin from '..'

export default function GenerateStaticParamsPage(props: any) {
  return <GenerateStaticParamsPageOrigin {...props} pageHref="/cs/generate-static-params" />
}

import {generateStaticParams as generateStaticParamsOrigin} from '..'

export async function generateStaticParams(props) {
  return generateStaticParamsOrigin({ ...props, route, locale: 'cs'  })
}
`
  const inputRewrite = {
    originPath: '/generate-static-params/page.ts',
    localizedPath: '/cs/generate-static-params/page.ts',
  }

  const inputConfig: Config = {
    ...defaultConfig,
    defaultLocale: 'cs',
    locales: ['cs'],
    getOriginContents: () => `export async function generateStaticParams() {}`,
  }

  const compile = compileFactory(inputConfig)
  const output = compile(inputRewrite)
  expect(output).toBe(expectedOutput)
})
