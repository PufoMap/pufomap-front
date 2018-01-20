<template lang='pug' src='./MmNewPOIMForm.pug'></template>
<style src='./MmNewPOIMForm.css' scoped></style>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MmNewPOIMForm',
  data: () => ({
    formNewPOIM: {}
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
        this.formNewPOIM = Object.assign({}, {
          name: '',
          description: '',
          severity: '1',
          tags: [],
          photos: {}
        })
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
    handleCnageToAttachPhotos ({target}) {
      for (var i = 0; i < target.files.length; i++) {
        this.formNewPOIM.photos[target.files[i].name] = target.files[i]
      }
      this.formNewPOIM.photos = Object.assign({}, this.formNewPOIM.photos)
    },
    handleClickDeletePhoto (name) {
      delete this.formNewPOIM.photos[name]
      this.formNewPOIM.photos = Object.assign({}, this.formNewPOIM.photos)
    },
    handleSubmit () {
      this.setNewPOIM({
        name: this.formNewPOIM.name,
        description: this.formNewPOIM.description,
        severity: this.formNewPOIM.severity,
        tags: this.formNewPOIM.tags.filter(tag => tag.selected).map(tag => tag.name),
        photos: Object.values(this.formNewPOIM.photos)
      })
      this.saveNewPOIM()
    }
  }
}
</script>
