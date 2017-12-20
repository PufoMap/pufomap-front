import Vue from 'vue'
import Router from 'vue-router'

import PmHome from '@/pages/PmHome/PmHome'
import PmLogin from '@/pages/PmLogin/PmLogin'
import PmSignIn from '@/pages/PmSignIn/PmSignIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PmHome
    },
    {
      path: '/login',
      name: 'Login',
      component: PmLogin
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: PmSignIn
    }
  ]
})
