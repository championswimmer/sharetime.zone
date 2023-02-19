import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import '@/styles/app.scss'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
