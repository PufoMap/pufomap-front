<template lang='pug' src='./MmMapUi.pug'></template>
<style src='./MmMapUi.css' scoped></style>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'MmMapUi',
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
