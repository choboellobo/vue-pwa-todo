import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store/store';

const Login = () => import('../pages/login/login')
const Main = () => import('../pages/main/main')
const ProductsList = () => import('../pages/products-list/products-list')

Vue.use(Router)

// Auth Guard router
let authGuard = (to, from, next) => {
  if(store.state.user) next()
  else next({ path: '/login' })
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter(to, from, next) {
        // if users exists, can´t go
        if(store.state.user) next(false)
        else next()
      }
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      beforeEnter: authGuard
    },
    {
      path: '/list/:id',
      name: 'ProductList',
      component: ProductsList,
      beforeEnter: authGuard
    }
  ]
})
