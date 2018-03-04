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
        this.$router.push({name: 'map'})
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
  },
  metaInfo () {
    switch (this.type) {
      case 'login':
        return {
          title: 'Login',
          meta: [
            { vmid: 'description', name: 'description', content: 'El mapa de negocios y actividades que promuevan o comercien con fenómenos paranormales o pseudocientíficos. Página de login de usuarios de MagufoMap.' }
          ]
        }
      case 'sign-up':
        return {
          title: 'Registro',
          meta: [
            { vmid: 'description', name: 'description', content: 'El mapa de negocios y actividades que promuevan o comercien con fenómenos paranormales o pseudocientíficos. Página de registro de usuarios de MagufoMap.' }
          ]
        }
    }
  }
}
</script>
