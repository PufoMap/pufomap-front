<template lang='pug' src='./MmPOIMInfoBox.pug'></template>
<style src='./MmPOIMInfoBox.css' scoped></style>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'MmPOIMInfoBox',
  data: () => ({
    activedSection: 'info',
    isExtended: false,
    comment: '',
    changeRequest: ''
  }),
  computed: {
    ...mapGetters({
      poim: 'map/selectedPoim',
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  watch: {
    poim (newVal, oldVal) {
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
      setSelectedPOIM: 'map/SET_SELECTED_POIM'
    }),
    ...mapActions({
      addComent: 'map/addComment',
      addChangeRequest: 'map/addChangeRequest',
      vote: 'map/vote'
    }),
    // Panel handlers
    handleClose () {
      this.setSelectedPOIM(null)
      this.activedSection = 'info'
      this.isExtended = false
    },
    handleSetActiveSection (section) {
      this.activedSection = section
    },
    // Movile handlers
    handleClickExtendButton (event) {
      this.isExtended = !this.isExtended
    },
    handSwipeTop (event) {
      this.isExtended = true
    },
    handSwipeBottom (event) {
      this.isExtended = false
    },
    // Forms handlers
    handleSubmitComment () {
      this.addComent({ poimId: this.poim.id, comment: this.comment })
    },
    handleSubmitChangeRequest () {
      this.addChangeRequest({ poimId: this.poim.id, changeRequest: this.changeRequest })
    },
    handleClickVoteNegative () {
      this.vote({ poimId: this.poim.id, vote: -1 })
    },
    handleClickVotePositive () {
      this.vote({ poimId: this.poim.id, vote: 1 })
    }
  }
}
</script>
