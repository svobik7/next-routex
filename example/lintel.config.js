///** @type {import('next-roots').} */
module.exports = {
  origin: './app/en',
  locales: ['en', 'cs', 'es'],
  rules: [
    {
      originPath: 'account',
      lintels: [
        { locale: 'cs', lintelPath: 'ucet' },
        { locale: 'es', lintelPath: 'cuenta' },
      ],
      children: [
        {
          originPath: 'profile',
          lintels: [
            // children variant takes parent path as prefix = /cs/ucet/profil or /es/cuenta/perfil
            { locale: 'cs', lintelPath: 'profil' },
            { locale: 'es', lintelPath: 'perfil' },
          ],
          children: [
            {
              originPath: 'edit',
              lintels: [
                // children of children variant takes all parents path as prefix = /cs/ucet/profil/upravit or /es/cuenta/perfil/editar
                { locale: 'cs', lintelPath: 'upravit' },
                { locale: 'es', lintelPath: 'editar' },
              ],
            },
          ],
        },
        {
          originPath: 'settings',
          lintels: [
            { locale: 'cs', lintelPath: 'nastaveni' },
            { locale: 'es', lintelPath: 'ajustes' },
          ],
        },
      ],
    },
    {
      originPath: '(auth)',
      children: [
        {
          originPath: 'login',
          lintels: [
            { locale: 'cs', lintelPath: 'prihlaseni' },
            { locale: 'es', lintelPath: 'acceso' },
          ],
        },
        {
          originPath: 'signup',
          lintels: [
            { locale: 'cs', lintelPath: 'registrace' },
            { locale: 'es', lintelPath: 'registrarse' },
          ],
        },
      ],
    },
    {
      originPath: 'blog',
      lintels: [
        { locale: 'cs', lintelPath: 'magazin' },
        { locale: 'es', lintelPath: 'revista' },
      ],
      children: [
        {
          originPath: 'articles',
          lintels: [
            { locale: 'cs', lintelPath: 'clanky' },
            { locale: 'es', lintelPath: 'articulos' },
          ],
          // there is no need to add children for [articlesId] page as that does not need to be translated
        },
        {
          originPath: 'authors',
          lintels: [
            { locale: 'cs', lintelPath: 'autori' },
            { locale: 'es', lintelPath: 'autores' },
          ],
          // there is no need to add children for [authorsId] page as that does not need to be translated
        },
      ],
    },
  ],
}
