import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // TODO: Add modules here
  },
  strict: process.env.DEBUG,
  plugins: process.env.DEBUG ? [createLogger()] : []
})

export default store
