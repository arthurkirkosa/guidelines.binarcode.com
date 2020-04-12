module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Getting Started',
        sidebarDepth: 1,
        path: '/',
        children: []
      },
      {
       title: 'Workflow',
       sidebarDepth: 3,
       path: 'workflow/frontend-setup',
       children: [
         '/workflow/frontend-setup',
         '/workflow/version-control',
       ]
      }
    ]
  }
}
