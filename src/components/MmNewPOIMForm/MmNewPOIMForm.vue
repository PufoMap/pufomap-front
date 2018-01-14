<template lang='pug' src='./MmNewPOIMForm.pug'></template>
<style src='./MmNewPOIMForm.css' scoped></style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MmNewPOIMForm',
  data: () => ({
    formNewPOIM: {
      name: '',
      description: '',
      severity: '1',
      tags: []
    }
  }),
  computed: {
    ...mapGetters({
      newPOIMFormVisible: 'map/newPOIMFormVisible',
      newPOIM: 'map/newPOIM',
      tags: 'tags/tags'
    })
  },
  watch: {
    newPOIMFormVisible (newVal, oldVal) {
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
      this.formNewPOIM.tags = tags
    }
  },
  methods: {
    ...mapMutations({
      setNewPOIMFormVisibility: 'map/SET_NEW_POIM_FORM_VISIBILITY',
      setNewPOIM: 'map/SET_NEW_POIM'
    }),
    ...mapActions({
      getTags: 'tags/getTags',
      saveNewPOIM: 'map/saveNewPOIM'
    }),
    handleClose () {
      this.setNewPOIMFormVisibility(false)
      this.setNewPOIM(null)
    },
    handleSubmit () {
      // this.setNewPOIM({
      console.log('Submit new POIM', this.formNewPOIM)
      this.setNewPOIM({
        name: this.formNewPOIM.name,
        description: this.formNewPOIM.description,
        severity: this.formNewPOIM.severity,
        tags: this.formNewPOIM.tags.filter(tag => tag.selected).map(tag => tag.name)
      })
      this.saveNewPOIM()
    }
  }
}
</script>
