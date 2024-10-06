import { createWebHistory, createRouter } from 'vue-router'

import HelloWorld from '@/components/HelloWorld.vue'
import TheWelcome from '@/components/TheWelcome.vue'

const routes = [
  { path: '/ta', name:"hello",component: HelloWorld },
  { path: '/',name:"welcom", component: TheWelcome },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router