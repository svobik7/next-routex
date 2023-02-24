import type { Origin, Rewrite } from '../types'
import { getRewrites } from './getRewrites'

const inputOrigin: Origin = {
  path: '/(auth)/layout.ts',
  localizations: [
    { locale: 'en', path: '/(auth)/layout.ts' },
    { locale: 'cs', path: '/(auth)/layout.ts' },
    { locale: 'es', path: '/(auth)/layout.ts' },
  ],
}

const expectedOutput: Rewrite[] = [
  { originPath: '/(auth)/layout.ts', localizedPath: '/en/(auth)/layout.ts' },
  { originPath: '/(auth)/layout.ts', localizedPath: '/cs/(auth)/layout.ts' },
  { originPath: '/(auth)/layout.ts', localizedPath: '/es/(auth)/layout.ts' },
]

test('getRewrites', () => {
  const rewrites = getRewrites(inputOrigin)
  expect(rewrites).toStrictEqual(expectedOutput)
})
