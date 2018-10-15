module.exports = {
  title: 'Netlify CMS + VuePress',
  description: 'Netlify + VuePress',
  themeConfig: {
    docsDir: 'docs',
    repo: 'fivefilters/docs',
    editLinks: true,
    sidebar: 'auto',
    /*
      [
      '/',
      '/welcome',
      '/test'
      ],
    */
    nav: [
      {
        text: 'Admin',
        link: '/admin/#/',
      }
    ]
  }
}
