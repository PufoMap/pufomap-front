<template lang="pug" src='./MmHome.pug'></template>
<style src='./MmHome.css'></style>

<script>
import MmMap from '@/components/MmMap/MmMap'
import MmMapUi from '@/components/MmMapUi/MmMapUi'
import MmFilters from '@/components/MmFilters/MmFilters'
import MmPOIMInfoBox from '@/components/MmPOIMInfoBox/MmPOIMInfoBox'
import MmNewPOIMForm from '@/components/MmNewPOIMForm/MmNewPOIMForm'

export default {
  name: 'MmHome',
  components: {
    'mm-map': MmMap,
    'mm-map-ui': MmMapUi,
    'mm-filters': MmFilters,
    'mm-marker-infobox': MmPOIMInfoBox,
    'mm-new-marker-form': MmNewPOIMForm
  }
}
</script>
