module.exports = {
  site: 'Next.js',
  repo: 'mikefarrow',
  types: [
    {
      type: 'project',
      key: 'uid',
      route: '/work/:uid',
      index: '/work',
      indexFields: [
        'title',
        'header_image'
      ],
      indexOrder: 'my.project.title',
      indexPerPage: 2
    },
    {
      type: 'page',
      key: 'uid',
      route: '/:uid'
    }
  ]
}
