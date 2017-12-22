<template lang='pug' src='./PmMapUi.pug'></template>
<style src='./PmMapUi.css' scoped></style>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PmMapUi',
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>
