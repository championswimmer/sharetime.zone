// https://nuxt.com/docs/api/configuration/nuxt-config
import { join } from 'path'
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
    manifestFilename: 'site.webmanifest',
    injectRegister: 'script',
    injectManifest: {
      swDest: join(__dirname, 'dist', 'sw.js')
    },
    registerWebManifestInRouteRules: true,
    writePlugin: true
  },
  delayHydration: {
    // debug: process.env.NODE_ENV === 'development',
    mode: 'mount'
  }
})
