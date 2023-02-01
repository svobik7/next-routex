module.exports = {
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
}
