<template lang="pug" src='./MmLogin.pug'></template>
<style src='./MmLogin.css'></style>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MmLogin',
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
        this.$router.push({name: 'home'})
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
