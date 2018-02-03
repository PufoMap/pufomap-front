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
      poim: 'map/selectedPOIM',
      isAuthenticated: 'auth/isAuthenticated'
    }),
    emailHref () {
      return 'mailto:?subject=@title&body=@url%0D%0A%0D%0A@description'
        .replace(/@title/g, encodeURIComponent(this.poim.name))
        .replace(/@url/g, encodeURIComponent(window.location.href))
        .replace(/@description/g, encodeURIComponent(this.poim.description))
    },
    twitterHref () {
      return 'https://twitter.com/intent/tweet?url=@url&text=@text&hashtags=magufo&via=magufomap'
        .replace(/@text/g, encodeURIComponent(this.poim.name))
        .replace(/@url/g, encodeURIComponent(window.location.href))
    },
    facebookHref () {
      return 'https://www.facebook.com/sharer/sharer.php?u=@url&title=@title&description=@description&quote=@quote'
        .replace(/@title/g, encodeURIComponent(this.poim.name))
        .replace(/@url/g, encodeURIComponent(window.location.href))
        .replace(/@description/g, encodeURIComponent(this.poim.description))
        .replace(/@quote/g, encodeURIComponent(this.poim.description))
    }
  },
  watch: {
    poim (newVal, oldVal) {
      // Update url
      if (newVal) {
        this.$router.push({ name: 'poim', params: { slug: newVal.slug } })
      } else {
        this.$router.push({ name: 'map' })
      }

      // Initialize params
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
