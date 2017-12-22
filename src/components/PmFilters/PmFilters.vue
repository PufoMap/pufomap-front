
<template lang='pug' src='./PmFilters.pug'></template>
<style src='./PmFilters.css' scoped></style>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PmFilters',
  data: () => ({
    formFilters: {
      severity: {
        low: false,
        medium: false,
        high: false,
        dangerous: false
      },
      tags: []
    }
  }),
  computed: {
    ...mapGetters({
      filtersVisible: 'map/filtersVisible',
      filters: 'map/filters'
    })
  },
  methods: {
    ...mapMutations({
      setFiltersVisibility: 'map/SET_FILTERS_VISIBILITY',
      setFilters: 'map/SET_FILTERS'
    }),
    handleClose () {
      this.setFiltersVisibility(false)
    },
    handleSubmit () {
      this.setFilters(this.formFilters)
    }
  }
}
</script>
