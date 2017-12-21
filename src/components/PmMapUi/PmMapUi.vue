<template lang='pug' src='./PmMapUi.pug'></template>
<style src='./PmMapUi.css' scoped></style>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PmMapUi',
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  }
}
</script>
