
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()
const app = createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
    
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }