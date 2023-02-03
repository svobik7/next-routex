// IMPORTANT: before adding any new rule check already existing bunch of rules in eslint-config-next
// @see https://nextjs.org/docs/basic-features/eslint#eslint-plugin

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
  },
}
