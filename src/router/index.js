import Vue from 'vue'
import Router from 'vue-router'

import PmHome from '@/pages/PmHome/PmHome'
import PmLogin from '@/pages/PmLogin/PmLogin'
import PmSignIn from '@/pages/PmSignIn/PmSignIn'
import PmAboutUs from '@/pages/PmAboutUs/PmAboutUs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: PmHome
    },
    {
      path: '/login',
      name: 'login',
      component: PmLogin
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: PmSignIn
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: PmAboutUs
    }
  ]
})
