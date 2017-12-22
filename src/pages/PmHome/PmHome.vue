<template lang="pug" src='./PmHome.pug'></template>
<style src='./PmHome.css'></style>

<script>
import PmAuth from '@/components/PmAuth/PmAuth'
import PmMap from '@/components/PmMap/PmMap'
import PmFilters from '@/components/PmFilters/PmFilters'
import PmMarkerInfoBox from '@/components/PmMarkerInfoBox/PmMarkerInfoBox'
import PmMapUi from '@/components/PmMapUi/PmMapUi'

export default {
  name: 'PmHome',
  components: {
    'pm-auth': PmAuth,
    'pm-map': PmMap,
    'pm-filters': PmFilters,
    'pm-marker-infobox': PmMarkerInfoBox,
    'pm-map-ui': PmMapUi
  }
}
</script>
