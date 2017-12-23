<template lang='pug' src='./PmFilters.pug'></template>
<style src='./PmFilters.css' scoped></style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PmFilters',
  data: () => ({
    formFilters: {
      statuses: {
        published: false,
        pending: false,
        invalid: false
      },
      severities: {
        low: false,
        medium: false,
        high: false,
        dangerous: false
      },
      tags: {}
    }
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      filtersVisible: 'map/filtersVisible',
      filters: 'map/filters',
      tags: 'tags/tags'
    })
  },
  watch: {
    filtersVisible (newVal, oldVal) {
      if (newVal) {
        this.getTags()
      }
    },
    tags (newVal, oldVal) {
      let tags = []
      newVal.forEach(tag => (
        tags.push({
          slug: tag.slug,
          name: tag.name,
          selected: false
        })
      ))
      this.formFilters.tags = tags
    }
  },
  methods: {
    ...mapMutations({
      setFiltersVisibility: 'map/SET_FILTERS_VISIBILITY',
      setFilters: 'map/SET_FILTERS'
    }),
    ...mapActions({
      getTags: 'tags/getTags'
    }),
    handleClose () {
      this.setFiltersVisibility(false)
    },
    handleSubmit () {
      this.setFilters({
        statuses: this.formFilters.statuses,
        severities: this.formFilters.severities,
        tags: this.formFilters.tags.filter(tag => tag.selected).map(tag => tag.name)
      })
    }
  }
}
</script>
