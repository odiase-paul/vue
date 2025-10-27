import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'
import Landing from './views/Landing.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Dashboard from './views/Dashboard.vue'
import Tickets from './views/Tickets.vue'
import TicketNew from './views/TicketNew.vue'
import TicketEdit from './views/TicketEdit.vue'
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/auth/login', name: 'Login', component: Login },
  { path: '/auth/signup', name: 'Signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { auth: true } },
  { path: '/tickets', name: 'Tickets', component: Tickets, meta: { auth: true } },
  { path: '/tickets/new', name: 'TicketNew', component: TicketNew, meta: { auth: true } },
  { path: '/tickets/:id/edit', name: 'TicketEdit', component: TicketEdit, meta: { auth: true } },
]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ticketapp_session')
  if (to.meta.auth && !token) return next('/auth/login')
  next()
})
const app = createApp(App)
app.use(router)
app.use(Vue3Toastify, { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
app.config.globalProperties.$toast = toast
app.mount('#app')
