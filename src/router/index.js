import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store/store';

const Login = () => import('../pages/login/login')
const Main = () => import('../pages/main/main')

Vue.use(Router)

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
      component: Main
    }
  ]
})
