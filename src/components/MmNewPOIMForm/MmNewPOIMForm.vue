<template lang='pug' src='./MmNewPOIMForm.pug'></template>
<style src='./MmNewPOIMForm.css' scoped></style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MmNewPOIMForm',
  data: () => ({
    formNewPoim: {
      name: '',
      description: '',
      severity: 'low',
      tags: []
    }
  }),
  computed: {
    ...mapGetters({
      newPoimFormVisible: 'map/newPoimFormVisible',
      newPoim: 'map/newPoim',
      tags: 'tags/tags'
    })
  },
  watch: {
    newPoimFormVisible (newVal, oldVal) {
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
      this.formNewPoim.tags = tags
    }
  },
  methods: {
    ...mapMutations({
      setNewPoimFormVisibility: 'map/SET_NEW_POIM_FORM_VISIBILITY'
    }),
    ...mapActions({
      getTags: 'tags/getTags',
      setNewPoim: 'map/setNewPoim'
    }),
    handleClose () {
      this.setNewPoimFormVisibility(false)
    },
    handleSubmit () {
      // this.setNewPoim({
      console.log('Submit new POIM')
    }
  }
}
</script>

