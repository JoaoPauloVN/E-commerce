import { createRouter, createWebHistory } from 'vue-router'

// components
import Category from '@/views/Category.vue'
import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import User from '@/views/UserPage.vue'
import Cart from '@/views/Cart.vue'
import UserAddress from '@/components/UserAddress.vue'
import UserProfile from '@/components/UserProfile.vue'
import NewUserAddress from '@/components/NewUserAddress.vue'


// middleware
import VueRouteMiddleware from 'vue-route-middleware'
import Auth from './middleware/Auth.js'
import IsLogged from './middleware/IsLogged.js'

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
  },
  {
    path: '/categoria/:slug',
    name: 'Categoria',
    component: Category
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      middleware: [ IsLogged ]
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      middleware: [ IsLogged ]
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      middleware: [ Auth ]
    },
    children: [
      {
        path: 'endereco',
        name: 'UserAddress',
        component: UserAddress
      },
      {
        path: 'endereco/novo',
        name: 'NewUserAddress',
        component: NewUserAddress
      },
      {
        path: 'dados',
        name: 'UserProfile',
        component: UserProfile
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(VueRouteMiddleware());


export default router

