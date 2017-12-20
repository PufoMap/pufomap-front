<template lang="pug" src='./PmLogin.pug'></template>
<style src='./PmLogin.css'></style>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PmLogin',
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  watch: {
    isAuthenticated (newVal, oldVal) {
      if (newVal) {
        this.$router.push({name: 'Home'})
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    handleSubmit () {
      this.login({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
