module.exports = {
  title: "BinarCode guildelines",
  description: "Best practices & workflows",
  base: "/",

  serviceWorker: true,

  plugins: [
    '@vuepress/pwa',
    require('./plugins/metaVersion.js')
  ],

  head: [
    [
      "link",
      {
        href:
          "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i",
        rel: "stylesheet",
        type: "text/css"
      }
    ],
    // Used for PWA
    [
      "link",
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ],
    [
      "link",
      {
        rel: 'icon',
        href: '/icon.png'
      }
    ]
  ],

  themeConfig: {
    logo: "/assets/img/logo-dark.png",
    displayAllHeaders: true,
    sidebarDepth: 2,

    nav: [
      { text: "Home", link: "https://guidelines.binarcode.com" },
      {
        text: "Version",
        link: "/",
        items: [{ text: "1.0", link: "/1.0/" }]
      }
    ],

    sidebar: {
      "/1.0/": require("./1.0"),
    },

    algolia: {
      indexName: 'binar_code_guideline',
      appId: 'UZVIN1OABU',
      apiKey: 'fc354bfef2c2f5888d974a37570912a8',
      algoliaOptions: {
        facetFilters: ["version:3.0.0"]
      }
    }
  }
};
