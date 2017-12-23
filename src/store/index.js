import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

import auth from '@/store/modules/auth'
import map from '@/store/modules/map'
import tags from '@/store/modules/tags'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    map,
    tags
  },
  strict: process.env.DEBUG,
  plugins: process.env.DEBUG ? [createLogger()] : []
})

export default store
