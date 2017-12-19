export default client => ({
  list () {
    return client
      .get('pois')
      .then(response => response.data.results)
  }
})
