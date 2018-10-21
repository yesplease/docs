module.exports = {
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ],
  title: 'FiveFilters.org Docs',
  description: 'Documentation', 
  themeConfig: {
    docsDir: 'docs',
    search: true,
    searchMaxSuggestions: 10,
    repo: 'fivefilters/docs',
    editLinks: true,
    sidebar: {

      '/full-text-rss/': [
        '',
        'screenshots',
        'requirements',
        'hosting',
        'installing',
        'usage',
        'code-example',
        'configure',
        'site-patterns',
        'example-feeds',
        'blocked-sites'
      ],

      '/pdf-newspaper/': [
        'screenshots',
        'installing',
        'configure',
        'example-feeds'
      ],

      '/': [
        ''
      ]
    },
    nav: [
      {
        text: 'Home',
        link: 'https://fivefilters.org'
      },
      {
        text: 'Docs',
        items: [
          {
            text: 'Full-Text RSS',
            link: '/full-text-rss'
          }
        ]
      },
      {
        text: 'Forum',
        link: 'https://forum.fivefilters.org'
      },
      {
        text: 'Your account',
        link: 'https://member.fivefilters.org'
      }
    ]
  }
}
