<template lang="pug" src='./MmAuth.pug'></template>
<style src='./MmAuth.css'></style>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MmAuth',
  props: ['type'],
  data: () => ({
    username: '',
    password: ''
  }),
  computed: {
    ...mapGetters({
      isLoading: 'auth/isLoading',
      error: 'auth/error',
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
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
