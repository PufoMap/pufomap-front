<template lang='pug' src='./PmMapUi.pug'></template>
<style src='./PmMapUi.css' scoped></style>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PmMapUi',
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      isFilterApplied: 'map/isFilterApplied'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    ...mapMutations({
      setFiltersVisibility: 'map/SET_FILTERS_VISIBILITY'
    })
  }
}
</script>
