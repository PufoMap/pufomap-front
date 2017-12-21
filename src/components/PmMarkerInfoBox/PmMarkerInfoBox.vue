<template lang='pug' src='./PmMarkerInfoBox.pug'></template>
<style src='./PmMarkerInfoBox.css' scoped></style>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PmMarkerInfoBox',
  data: () => ({
    activedSection: 'info',
    isExtended: 'true'
  }),
  computed: {
    ...mapGetters({
      poi: 'map/selectedPoi'
    })
  },
  watch: {
    poi (newVal, oldVal) {
      this.activedSection = 'info'
    }
  },
  methods: {
    ...mapMutations({
      setSelectedPOI: 'map/SET_SELECTED_POI'
    }),
    handleClose () {
      this.setSelectedPOI(null)
      this.activedSection = 'info'
      this.isExtended = 'true'
    },
    handleSetActiveSection (section) {
      this.activedSection = section
    }
  }
}
</script>
