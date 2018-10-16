module.exports = {
  title: 'FiveFilters.org',
  description: 'Documentation',
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
        text: 'Apps',
        items: [
          {
            text: 'Full-Text RSS',
            link: '/full-text-rss'
          }
        ]
      }
    ]
  }
}
