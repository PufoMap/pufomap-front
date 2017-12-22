export default client => ({
  list () {
    return client
      .get('pois/')
      .then(response => response.data.results)
  },
  get (id) {
    return client
      .get(`pois/${id}/`)
      .then(response => response.data)
  },
  addVote (poiId, vote) {
    return client
      .post('ratings/', {
        poi: poiId,
        vote: vote
      })
      .then(response => response.data)
  },
  addComent (poiId, comment) {
    return client
      .post('comments/', {
        poi: poiId,
        comment: comment
      })
      .then(response => response.data)
  },
  addChangeRequest (poiId, change) {
    return client
      .post('changerequests/', {
        poi: poiId,
        change: change
      })
      .then(response => response.data)
  }
})
