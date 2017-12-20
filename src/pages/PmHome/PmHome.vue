<template lang="pug" src='./PmHome.pug'></template>
<style src='./PmHome.css'></style>

<script>
import PmMap from '@/components/PmMap/PmMap'
import PmMarkerInfoBox from '@/components/PmMarkerInfoBox/PmMarkerInfoBox'

export default {
  name: 'PmHome',
  components: {
    'pm-map': PmMap,
    'pm-marker-infobox': PmMarkerInfoBox
  }
}
</script>
