import api from '@/services/api'

const state = {
  tags: []
}

const getters = {
  tags: state => state.tags
}

const mutationTypes = {
  SET_TAGS: 'SET_TAGS'
}

const mutations = {
  [mutationTypes.SET_TAGS] (state, tags) {
    state.tags = tags
  }
}

const actions = {
  getTags ({ commit, state }) {
    return api.tags.list()
      .then(tags => commit(mutationTypes.SET_TAGS, tags))
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
