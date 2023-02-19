// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  alias: {
    '~bulma': 'node_modules/bulma'
  },
  css: [
    '@/styles/fonts.css',
    '@/styles/app.scss'
  ]
})
