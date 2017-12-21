export default (client) => ({
  login (email, password) {
    return client
      .post('login', {
        username: email,
        password: password
      })
      .then(response => response.data.token)
  }
})
