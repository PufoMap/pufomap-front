import api from '@/services/api'

const state = {
  pois: [],
  selectedPoi: null
}

const getters = {
  pois: state => state.pois,
  selectedPoi: state => state.selectedPoi
}

const mutationTypes = {
  SET_POIS: 'SET_POIS',
  SET_SELECTED_POI: 'SET_SELECTED_POI'
}

const mutations = {
  [mutationTypes.SET_POIS] (state, pois) {
    state.pois = pois
  },
  [mutationTypes.SET_SELECTED_POI] (state, poi) {
    state.selectedPoi = poi
  }
}

const actions = {
  getPOIs ({ commit, state }) {
    return api.pois.list()
      .then(pois =>
        commit(mutationTypes.SET_POIS, pois))
      .catch(error => console.error('vuex error:', error))
  },
  getPOI ({commit, state}, id) {
    return api.pois.get(id)
      .then(poi =>
        commit(mutationTypes.SET_SELECTED_POI, poi))
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
