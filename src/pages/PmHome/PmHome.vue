<template lang="pug" src='./PmHome.pug'></template>
<style src='./PmHome.css'></style>

<script>
import PmAuth from '@/components/PmAuth/PmAuth'
import PmMap from '@/components/PmMap/PmMap'
import PmMapUi from '@/components/PmMapUi/PmMapUi'
import PmFilters from '@/components/PmFilters/PmFilters'
import PmMarkerInfoBox from '@/components/PmMarkerInfoBox/PmMarkerInfoBox'
import PmNewMarkerForm from '@/components/PmNewMarkerForm/PmNewMarkerForm'

export default {
  name: 'PmHome',
  components: {
    'pm-auth': PmAuth,
    'pm-map': PmMap,
    'pm-map-ui': PmMapUi,
    'pm-filters': PmFilters,
    'pm-marker-infobox': PmMarkerInfoBox,
    'pm-new-marker-form': PmNewMarkerForm
  }
}
</script>
