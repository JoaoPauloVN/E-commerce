import { createRouter, createWebHistory } from 'vue-router'
import Category from '@/views/Category.vue'
import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: Product
  }, {
    path: '/categoria/:slug',
    name: 'Categoria',
    component: Category
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
