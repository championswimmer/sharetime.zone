import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import '@/styles/fonts.css'
import '@/styles/app.scss'
import { createHead, Head } from '@egoist/vue-head'

createApp(App)
  .component('Head', Head)
  .use(router)
  .use(createHead())
  .use(createPinia())
  .mount('#app')
