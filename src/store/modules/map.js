import api from '@/services/api'

const state = {
  pois: [],
  boundingBox: null,
  filters: {
    statuses: {
      published: false,
      pending: false,
      invalid: false
    },
    severities: {
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
  selectedPoi: state => state.selectedPoi,
  filters: state => state.filters,
  filtersVisible: state => state.filtersVisible,
  isFilterApplied: state => (
    (state.filters.statuses && (
      state.filters.statuses.published ||
      state.filters.statuses.pending ||
      state.filters.statuses.invalid
    )) || (state.filters.severities && (
      state.filters.severities.low ||
      state.filters.severities.medium ||
      state.filters.severities.high ||
      state.filters.severities.dangerous
    )) || (state.filters.tags &&
      state.filters.tags.length > 0
    )
  )
}

const mutationTypes = {
  SET_POIS: 'SET_POIS',
  SET_BOUNDINGBOX: 'SET_BOUNDINGBOX',
  SET_FILTERS: 'SET_FILTERS',
  SET_SELECTED_POI: 'SET_SELECTED_POI',
  SET_FILTERS_VISIBILITY: 'SET_FILTERS_VISIBILITY'
}

const mutations = {
  [mutationTypes.SET_POIS] (state, pois) {
    state.pois = pois
  },
  [mutationTypes.SET_BOUNDINGBOX] (state, boundingBox) {
    // To double the area of the bounds (approximately, not taking projection into account),
    // you have to increase the total length in each axis by sqrt(2), hence increase the bounds
    // in each direction by sqrt(2) / 2
    const bigBoundingBox = boundingBox.pad(Math.sqrt(2) / 2)
    state.boundingBox = bigBoundingBox.toBBoxString()
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
  changeBoundingBox ({ dispatch, commit, state }, boundingBox) {
    commit(mutationTypes.SET_BOUNDINGBOX, boundingBox)
    return dispatch('getPOIs')
  },
  getPOIs ({ commit, state }) {
    return api.pois.list(state.boundingBox, state.filters)
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
