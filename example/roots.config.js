module.exports = {
  rootDir: './app',
  locales: ['en', 'cs', 'es'], // the first one is the default one
  routes: [
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
            // children translations takes parent path as prefix => /cs/ucet/profil or /es/cuenta/perfil
            { locale: 'cs', segment: 'profil' },
            { locale: 'es', segment: 'perfil' },
          ],
          children: [
            {
              rootPath: 'edit',
              translations: [
                // children of children translations takes all parents segments as prefix = /cs/ucet/profil/upravit or /es/cuenta/perfil/editar
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
        { locale: 'cs', segment: 'magazin' },
        { locale: 'es', segment: 'revista' },
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
              regExp: 'w+',
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
  ],
}
