export default client => ({
  list () {
    return client
      .get('pois')
      .then(response => response.data.results)
  },
  get (id) {
    return client
      .get(`pois/${id}`)
      .then(response => response.data)
  }
})
