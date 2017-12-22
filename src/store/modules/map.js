import api from '@/services/api'

const state = {
  pois: [],
  filters: {
    severity: {
      low: false,
      medium: false,
      high: false,
      dangerous: false
    },
    tags: []
  },
  selectedPoi: null,
  filtersVisible: false
}

const getters = {
  pois: state => state.pois,
  filters: state => state.filters,
  selectedPoi: state => state.selectedPoi,
  filtersVisible: state => state.filtersVisible
}

const mutationTypes = {
  SET_POIS: 'SET_POIS',
  SET_FILTERS: 'SET_FILTERS',
  SET_SELECTED_POI: 'SET_SELECTED_POI',
  SET_FILTERS_VISIBILITY: 'SET_FILTERS_VISIBILITY'
}

const mutations = {
  [mutationTypes.SET_POIS] (state, pois) {
    state.pois = pois
  },
  [mutationTypes.SET_SELECTED_POI] (state, poi) {
    state.selectedPoi = poi
  },
  [mutationTypes.SET_FILTERS_VISIBILITY] (state, visibility) {
    state.filtersVisible = visibility
  },
  [mutationTypes.SET_FILTERS] (state, filters) {
    state.filters = Object.assign({}, state.filters, filters)
  }
}

const actions = {
  resetMap ({ dispatch, commit, state }) {
    commit(mutationTypes.SET_SELECTED_POI, null)
    dispatch('getPOIs')
  },
  getPOIs ({ commit, state }) {
    return api.pois.list(state.filters)
      .then(pois => commit(mutationTypes.SET_POIS, pois))
      .catch(error => console.error('vuex error:', error))
  },
  selectPOI ({commit, state}, id) {
    return api.pois.get(id)
      .then(poi => commit(mutationTypes.SET_SELECTED_POI, poi))
      .catch(error => console.error('vuex error:', error))
  },
  unselectPOI ({ dispatch, commit, state }) {
    commit(mutationTypes.SET_SELECTED_POI, null)
  },
  vote ({dispatch, commit, state}, { poiId, vote }) {
    return api.pois.addVote(poiId, vote)
      .then(() => (dispatch('getPOIs').then(() => dispatch('selectPOI', poiId))))
      .catch(error => console.error('vuex error:', error))
  },
  addComment ({dispatch, commit, state}, { poiId, comment }) {
    return api.pois.addComent(poiId, comment)
      .then(() => (dispatch('getPOIs').then(() => dispatch('selectPOI', poiId))))
      .catch(error => console.error('vuex error:', error))
  },
  addChangeRequest ({dispatch, commit, state}, { poiId, changeRequest }) {
    return api.pois.addChangeRequest(poiId, changeRequest)
      .then(() => (dispatch('getPOIs').then(() => dispatch('selectPOI', poiId))))
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
