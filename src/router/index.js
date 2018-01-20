import Vue from 'vue'
import Router from 'vue-router'

import MmHome from '@/pages/MmHome/MmHome'
import MmAuth from '@/pages/MmAuth/MmAuth'
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
      component: MmAuth,
      props: { type: 'login' }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: MmAuth,
      props: { type: 'sign-up' }
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: MmAboutUs
    }
  ]
})
