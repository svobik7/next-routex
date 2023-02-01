module.exports = {
  rootDir: './app/en',
  locales: ['en', 'cs', 'es'],
  rules: [
    {
      rootPath: 'account',
      routes: [
        { locale: 'cs', routePath: 'ucet' },
        { locale: 'es', routePath: 'cuenta' },
      ],
      children: [
        {
          rootPath: 'profile',
          routes: [
            // children routes takes parent path as prefix => /cs/ucet/profil or /es/cuenta/perfil
            { locale: 'cs', routePath: 'profil' },
            { locale: 'es', routePath: 'perfil' },
          ],
          children: [
            {
              rootPath: 'edit',
              routes: [
                // children of children variant takes all parents path as prefix = /cs/ucet/profil/upravit or /es/cuenta/perfil/editar
                { locale: 'cs', routePath: 'upravit' },
                { locale: 'es', routePath: 'editar' },
              ],
            },
          ],
        },
        {
          rootPath: 'settings',
          routes: [
            { locale: 'cs', routePath: 'nastaveni' },
            { locale: 'es', routePath: 'ajustes' },
          ],
        },
      ],
    },
    {
      rootPath: '(auth)',
      children: [
        {
          rootPath: 'login',
          routes: [
            { locale: 'cs', routePath: 'prihlaseni' },
            { locale: 'es', routePath: 'acceso' },
          ],
        },
        {
          rootPath: 'signup',
          routes: [
            { locale: 'cs', routePath: 'registrace' },
            { locale: 'es', routePath: 'registrarse' },
          ],
        },
      ],
    },
    {
      rootPath: 'blog',
      routes: [
        { locale: 'cs', routePath: 'magazin' },
        { locale: 'es', routePath: 'revista' },
      ],
      children: [
        {
          rootPath: 'articles',
          routes: [
            { locale: 'cs', routePath: 'clanky' },
            { locale: 'es', routePath: 'articulos' },
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
          routes: [
            { locale: 'cs', routePath: 'autori' },
            { locale: 'es', routePath: 'autores' },
          ],
          children: [
            {
              rootPath: '[authorId]',
              // regExp: 'w+',
            },
          ],
        },
      ],
    },
  ],
}
