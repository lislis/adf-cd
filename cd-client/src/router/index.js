import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Group from '@/views/Group.vue'
import Chat from '@/views/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/groups/:groupid',
    name: 'Group',
    component: Group
  },
  {
    path: '/chat/:chatid',
    name: 'Chat',
    component: Chat
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
