import Vue from 'vue'
import Router from 'vue-router'

import PmHome from '@/pages/PmHome/PmHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PmHome
    }
  ]
})
