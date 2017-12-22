
<template lang='pug' src='./PmFilters.pug'></template>
<style src='./PmFilters.css' scoped></style>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PmFilters',
  computed: {
    ...mapGetters({
      filtersVisible: 'map/filtersVisible'
    })
  },
  methods: {
    ...mapMutations({
      setFiltersVisibility: 'map/SET_FILTERS_VISIBILITY'
    }),
    handleClose () {
      this.setFiltersVisibility(false)
    }
  }
}
</script>
