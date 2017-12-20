<template lang="pug" src='./PmMap.pug'></template>
<style src='./PmMap.css' scoped></style>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue2Leaflet from 'vue2-leaflet'

import PmMarkerInfoBox from '@/components/PmMarkerInfoBox/PmMarkerInfoBox'
import PmMarker from '@/components/PmMarker/PmMarker'

export default {
  name: 'PmMap',
  data: () => ({
    zoom: 10,
    center: [40.4360, -3.6714],
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri & Co.'
  }),
  computed: {
    ...mapGetters({
      pois: 'map/pois'
    })
  },
  methods: {
    ...mapActions({
      getPOIs: 'map/getPOIs'
    })
  },
  mounted () {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.center = [pos.coords.latitude, pos.coords.longitude]
          this.getPOIs()
        }
      )
    } else {
      this.getPOIs()
    }
  },
  components: {
    'vl-map': Vue2Leaflet.Map,
    'vl-tilelayer': Vue2Leaflet.TileLayer,
    'pm-marker': PmMarker,
    'pm-marker-infobox': PmMarkerInfoBox

  }
}
</script>
