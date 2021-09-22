import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#00cd81'
  },
  content: {
    liveEdit: false
  },
  head: {
    title: 'BinarCode Guidelines',
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  }
})
