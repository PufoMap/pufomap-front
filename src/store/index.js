import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

import user from '@/store/modules/user'
import map from '@/store/modules/map'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    map
  },
  strict: process.env.DEBUG,
  plugins: process.env.DEBUG ? [createLogger()] : []
})

export default store
