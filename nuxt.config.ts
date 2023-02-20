// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-delay-hydration',
    '@vite-pwa/nuxt'
  ],
  app: {
    head: {
      title: 'sharetime.zone',
      charset: 'utf-8',
      meta: [
        { name: 'description', content: 'Share time in different timezones easily' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  srcDir: 'src',
  alias: {
    '~bulma': 'node_modules/bulma'
  },
  css: [
    '@/styles/fonts.css',
    '@/styles/app.scss'
  ],
  pwa: {
    minify: true,
    registerType: 'autoUpdate',
    manifest: {
      name: 'sharetime.zone',
      short_name: 'sharetime.zone',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: '#0099cc',
      background_color: '#ffffff',
      display: 'standalone'
    },
    manifestFilename: 'site.webmanifest',
    registerWebManifestInRouteRules: true
  },
  delayHydration: {
    // debug: process.env.NODE_ENV === 'development',
    mode: 'mount'
  }
})
