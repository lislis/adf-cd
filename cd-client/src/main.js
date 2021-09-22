import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import { plainAxiosInstance } from '@/backend/axios'
import './registerServiceWorker'
import router from './router'
import './index.css'
import { store } from './store'

createApp(App)
  .use(router)
  .use(store)
  .use(VueAxios, {
    plain: plainAxiosInstance
  })
  .mount('#app')
