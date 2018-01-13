import api from '@/services/api'

const state = {
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
  filtersVisible: false,
  poims: [],
  selectedPoim: null,
  newPoim: {},
  newPoimFormVisible: false
}

const getters = {
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
  ),
  poims: state => state.poims,
  selectedPoim: state => state.selectedPoim,
  newPoim: state => state.newPoim,
  newPoimExist: state => state.newPoim.location,
  newPoimFormVisible: state => state.newPoimFormVisible
}

const mutationTypes = {
  SET_BOUNDINGBOX: 'SET_BOUNDINGBOX',
  SET_FILTERS: 'SET_FILTERS',
  SET_FILTERS_VISIBILITY: 'SET_FILTERS_VISIBILITY',
  SET_POIMS: 'SET_POIMS',
  SET_SELECTED_POIM: 'SET_SELECTED_POIM',
  SET_NEW_POIM: 'SET_NEW_POIM',
  SET_NEW_POIM_FORM_VISIBILITY: 'SET_NEW_POIM_FORM_VISIBILITY'
}

const mutations = {
  [mutationTypes.SET_BOUNDINGBOX] (state, boundingBox) {
    // To double the area of the bounds (approximately, not taking projection into account),
    // you have to increase the total length in each axis by sqrt(2), hence increase the bounds
    // in each direction by sqrt(2) / 2
    const bigBoundingBox = boundingBox.pad(Math.sqrt(2) / 2)
    state.boundingBox = bigBoundingBox.toBBoxString()
  },
  [mutationTypes.SET_FILTERS] (state, filters) {
    state.filters = Object.assign({}, state.filters, filters)
  },
  [mutationTypes.SET_FILTERS_VISIBILITY] (state, visibility) {
    state.filtersVisible = visibility
  },
  [mutationTypes.SET_POIMS] (state, poims) {
    state.poims = poims
  },
  [mutationTypes.SET_SELECTED_POIM] (state, poim) {
    state.selectedPoim = poim
  },
  [mutationTypes.SET_NEW_POIM] (state, newPoim) {
    state.newPoim = newPoim
  },
  [mutationTypes.SET_NEW_POIM_FORM_VISIBILITY] (state, visibility) {
    state.newPoimFormVisible = visibility
  }
}

const actions = {
  resetMap ({ dispatch, commit, state }) {
    commit(mutationTypes.SET_SELECTED_POIM, null)
    commit(mutationTypes.SET_NEW_POIM, {})
    dispatch('getPOIMs')
  },
  changeBoundingBox ({ dispatch, commit, state }, boundingBox) {
    commit(mutationTypes.SET_BOUNDINGBOX, boundingBox)
    return dispatch('getPOIMs')
  },
  getPOIMs ({ commit, state }) {
    return api.poims.list(state.boundingBox, state.filters)
      .then(poims => commit(mutationTypes.SET_POIMS, poims))
      .catch(error => console.error('vuex error:', error))
  },
  selectPOIM ({commit, state}, id) {
    return api.poims.get(id)
      .then(poim => commit(mutationTypes.SET_SELECTED_POIM, poim))
      .catch(error => console.error('vuex error:', error))
  },
  unselectPOIM ({ dispatch, commit, state }) {
    commit(mutationTypes.SET_SELECTED_POIM, null)
  },
  vote ({dispatch, commit, state}, { poimId, vote }) {
    return api.poims.addVote(poimId, vote)
      .then(() => (dispatch('getPOIMs').then(() => dispatch('selectPOIM', poimId))))
      .catch(error => console.error('vuex error:', error))
  },
  addComment ({dispatch, commit, state}, { poimId, comment }) {
    return api.poims.addComent(poimId, comment)
      .then(() => (dispatch('getPOIMs').then(() => dispatch('selectPOIM', poimId))))
      .catch(error => console.error('vuex error:', error))
  },
  addChangeRequest ({dispatch, commit, state}, { poimId, changeRequest }) {
    return api.poims.addChangeRequest(poimId, changeRequest)
      .then(() => (dispatch('getPOIMs').then(() => dispatch('selectPOIM', poimId))))
      .catch(error => console.error('vuex error:', error))
  },
  setNewPoim ({commit, state}, newPoim) {
    commit(mutationTypes.SET_NEW_POIM, newPoim)
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
