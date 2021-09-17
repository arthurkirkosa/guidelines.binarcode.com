import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#00cd81'
  },
  head: {
    title: 'BinarCode Guidelines',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: ' This site contains a set of guidelines we use to bring our projects to a good end. We decided to document our workflow because consistency is one of the most valuable traits of maintainable software.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  }
})
