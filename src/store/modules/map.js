import api from '@/services/api'

const state = {
  pois: []
}

const getters = {
  pois: state => state.pois
}

const mutationTypes = {
  SET_POIS: '@pufomap/UI/map/GET_POIS'
}

const mutations = {
  [mutationTypes.SET_POIS] (state, pois) {
    state.pois = pois
  }
}

const actions = {
  getPOIs ({ commit, state }) {
    return api.pois.list()
      .then(pois =>
        commit(mutationTypes.SET_POIS, pois))
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
