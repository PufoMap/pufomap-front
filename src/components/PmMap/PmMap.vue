<template src='./PmMap.html'></template>
<style src='./PmMap.css' scoped></style>

<script>
import Vue2Leaflet from 'vue2-leaflet'
import PmMarkerInfoBox from '@/components/PmMarkerInfoBox/PmMarkerInfoBox'
import PmMarker from '@/components/PmMarker/PmMarker'

export default {
  name: 'PmMap',
  data: () => ({
    zoom: 14,
    center: [40.4360, -3.6714],
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri & Co.'
  }),
  mounted () {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.center = [pos.coords.latitude, pos.coords.longitude]
        }
      )
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
