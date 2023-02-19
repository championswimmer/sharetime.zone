// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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

declare module 'nuxt/schema' {
  interface NuxtConfig {
    delayHydration?: {
      debug?: boolean,
      mode?: false | 'init' | 'mount' | 'manual'
    }
  }
}
