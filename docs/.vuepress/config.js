module.exports = {
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ],
  title: 'FiveFilters.org Documentation',
  description: 'Documentation', 
  themeConfig: {
    docsDir: 'docs',
    search: true,
    searchMaxSuggestions: 10,
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
