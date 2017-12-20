import api from '@/services/api'
import { localStorage } from '@/services/storage'

const state = {
  authToken: null,
  me: null
}

const getters = {
  authToken: state => state.authToken,
  isAuthenticated: state => state.authToken !== null,
  me: state => state.me
}

const mutationTypes = {
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_ME: 'SET_ME'
}

const mutations = {
  [mutationTypes.SET_AUTH_TOKEN] (state, token) {
    state.authToken = token
    api.setAuthorization(token)
    if (token) {
      localStorage.set('authToken', token)
    } else {
      localStorage.remove('authToken')
    }
  },
  [mutationTypes.SET_ME] (state, me) {
    state.me = me
  }
}

const actions = {
  auth ({ commit, state }) {
    const token = localStorage.get('authToken')
    return commit(mutationTypes.SET_AUTH_TOKEN, token)
  },
  login ({ commit, state }, { email, password }) {
    return api.auth.login(email, password)
      .then(token => {
        commit(mutationTypes.SET_AUTH_TOKEN, token)
        return true
      })
      .catch(error => console.error('vuex error:', error))
  },
  logout ({ commit, state }, { email, password }) {
    return commit(mutationTypes.SET_AUTH_TOKEN, null)
  },
  getMe ({commit, state}) {
    return api.auth.getMe()
      .then(me => commit(mutationTypes.SET_ME, me))
      .catch(error => console.error('vuex error:', error))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutationTypes,
  mutations,
  actions
}
