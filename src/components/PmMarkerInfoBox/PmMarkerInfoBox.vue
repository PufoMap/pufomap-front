<template lang='pug' src='./PmMarkerInfoBox.pug'></template>
<style src='./PmMarkerInfoBox.css' scoped></style>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'PmMarkerInfoBox',
  data: () => ({
    activedSection: 'info',
    isExtended: false,
    comment: '',
    changeRequest: ''
  }),
  computed: {
    ...mapGetters({
      poi: 'map/selectedPoi',
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  watch: {
    poi (newVal, oldVal) {
      if (oldVal && newVal && oldVal.id !== newVal.id) {
        this.activedSection = 'info'
        this.isExtended = false
      }
      this.comment = ''
      this.changeRequest = ''
    }
  },
  methods: {
    ...mapMutations({
      setSelectedPOI: 'map/SET_SELECTED_POI'
    }),
    ...mapActions({
      addComent: 'map/addComment',
      addChangeRequest: 'map/addChangeRequest',
      vote: 'map/vote'
    }),
    handleClose () {
      this.setSelectedPOI(null)
      this.activedSection = 'info'
      this.isExtended = false
    },
    handleSetActiveSection (section) {
      this.activedSection = section
    },
    handleSubmitComment () {
      this.addComent({ poiId: this.poi.id, comment: this.comment })
    },
    handleSubmitChangeRequest () {
      this.addChangeRequest({ poiId: this.poi.id, changeRequest: this.changeRequest })
    },
    handleClickVoteNegative () {
      this.vote({ poiId: this.poi.id, vote: -1 })
    },
    handleClickVotePositive () {
      this.vote({ poiId: this.poi.id, vote: 1 })
    }
  }
}
</script>
