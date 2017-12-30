<template lang='pug' src='./PmNewMarkerForm.pug'></template>
<style src='./PmNewMarkerForm.css' scoped></style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PmNewMarkerForm',
  data: () => ({
    formNewPoi: {
      name: '',
      description: '',
      severity: 'low',
      tags: []
    }
  }),
  computed: {
    ...mapGetters({
      newPoiFormVisible: 'map/newPoiFormVisible',
      newPoi: 'map/newPoi',
      tags: 'tags/tags'
    })
  },
  watch: {
    newPoiFormVisible (newVal, oldVal) {
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
      this.formNewPoi.tags = tags
    }
  },
  methods: {
    ...mapMutations({
      setNewPoiFormVisibility: 'map/SET_NEW_POI_FORM_VISIBILITY'
    }),
    ...mapActions({
      getTags: 'tags/getTags',
      setNewPoi: 'map/setNewPoi'
    }),
    handleClose () {
      this.setNewPoiFormVisibility(false)
    },
    handleSubmit () {
      // this.setNewPoi({
      console.log('Submit new POI')
    }
  }
}
</script>

