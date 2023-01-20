///** @type {import('next-roots').} */
module.exports = {
  locales: ['en', 'cs', 'es'],
  defaultLocale: 'en',
  routes: [
    {
      path: 'account',
      variants: [
        { locale: 'cs', href: 'ucet' },
        { locale: 'es', href: 'cuenta' },
      ],
      children: [
        {
          path: 'profile',
          variants: [
            // children variant takes parent path as prefix = /cs/ucet/profil or /es/cuenta/perfil
            { locale: 'cs', href: 'profil' },
            { locale: 'es', href: 'perfil' },
          ],
          children: [
            {
              path: 'edit',
              variants: [
                // children of children variant takes all parents path as prefix = /cs/ucet/profil/upravit or /es/cuenta/perfil/editar
                { locale: 'cs', href: 'upravit' },
                { locale: 'es', href: 'editar' },
              ],
            },
          ],
        },
        {
          path: 'settings',
          variants: [
            { locale: 'cs', href: 'nastaveni' },
            { locale: 'es', href: 'ajustes' },
          ],
        },
      ],
    },
    {
      path: 'auth',
      variants: [
        // empty or missing variant means that "auth" path will be used as translated href for that particular missing locale
      ],
      isShadowRoute: true,
      children: [
        {
          path: 'login',
          variants: [
            { locale: 'cs', href: 'prihlaseni' },
            { locale: 'es', href: 'acceso' },
          ],
        },
        {
          path: 'signup',
          variants: [
            { locale: 'cs', href: 'registrace' },
            { locale: 'es', href: 'registrarse' },
          ],
        },
      ],
    },
    {
      path: 'blog',
      variants: [
        { locale: 'cs', href: 'magazin' },
        { locale: 'es', href: 'revista' },
      ],
      children: [
        {
          path: 'articles',
          variants: [
            { locale: 'cs', href: 'clanky' },
            { locale: 'es', href: 'articulos' },
          ],
          // there is no need to add children for [articlesId] page as that does not need to be translated
        },
        {
          path: 'authors',
          variants: [
            { locale: 'cs', href: 'autori' },
            { locale: 'es', href: 'autores' },
          ],
          // there is no need to add children for [authorsId] page as that does not need to be translated
        },
      ],
    },
  ],
}
