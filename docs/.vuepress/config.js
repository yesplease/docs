module.exports = {
  title: 'Netlify CMS + VuePress',
  description: 'Netlify + VuePress',
  themeConfig: {
    docsDir: 'docs',
    repo: 'fivefilters/docs',
    editLinks: true,
    sidebar: {

      '/full-text-rss/': [
        ''      /* /bar/ */
      ],
      
      '/': [
        '',
        '/welcome',
        '/test'
      ]
    },
    nav: [
      {
        text: 'Admin',
        link: '/admin/#/',
      }
    ]
  }
}
