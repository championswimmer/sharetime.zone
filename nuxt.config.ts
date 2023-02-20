// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'sharetime.zone',
      charset: 'utf-8',
      meta: [
        { name: 'description', content: 'Share time in different timezones easily' }
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
  modules: [
    'nuxt-delay-hydration'
  ],
  delayHydration: {
    // debug: process.env.NODE_ENV === 'development',
    mode: 'mount'
  }
})
