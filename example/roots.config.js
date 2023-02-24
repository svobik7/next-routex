const path = require('path')

console.log('AS:', path.resolve(__dirname, 'src/roots'))
module.exports = {
  originDir: path.resolve(__dirname, 'src/roots'),
  localizeDir: path.resolve(__dirname, 'app'),
  locales: ['en', 'cs', 'es'],
  defaultLocale: 'en',
}
