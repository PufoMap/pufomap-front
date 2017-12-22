import api from '@/services/api'
import { localStorage } from '@/services/storage'

const state = {
  authToken: null
}

const getters = {
  isAuthenticated: state => state.authToken !== null
}

const mutationTypes = {
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_ME: 'SET_ME'
}

const mutations = {
  [mutationTypes.SET_AUTH_TOKEN] (state, token) {
    api.setAuthorization(token)
    state.authToken = token
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
    if (token) {
      commit(mutationTypes.SET_AUTH_TOKEN, token)
    }
  },
  login ({ commit, state }, { email, password }) {
    return api.auth.login(email, password)
      .then(token => commit(mutationTypes.SET_AUTH_TOKEN, token))
      .catch(error => console.error('vuex error:', error))
  },
  logout ({ dispatch, commit, state }) {
    commit(mutationTypes.SET_AUTH_TOKEN, null)
    dispatch('map/resetMap', null, { root: true })
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
