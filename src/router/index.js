import Vue from 'vue'
import Router from 'vue-router'

import MmHome from '@/pages/MmHome/MmHome'
import MmLogin from '@/pages/MmLogin/MmLogin'
import MmSignIn from '@/pages/MmSignIn/MmSignIn'
import MmAboutUs from '@/pages/MmAboutUs/MmAboutUs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: MmHome
    },
    {
      path: '/login',
      name: 'login',
      component: MmLogin
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: MmSignIn
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: MmAboutUs
    }
  ]
})
