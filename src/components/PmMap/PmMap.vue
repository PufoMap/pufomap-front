<template src='./PmMap.html'></template>
<style src='./PmMap.css' scoped></style>

<script>
import Vue2Leaflet from 'vue2-leaflet'
import PmMarker from '@/components/PmMarker/PmMarker'

export default {
  name: 'PmMap',
  components: {
    'vl-map': Vue2Leaflet.Map,
    'vl-tilelayer': Vue2Leaflet.TileLayer,
    'pm-marker': PmMarker,
    'vl-popup': Vue2Leaflet.Popup,
    'vl-tooltip': Vue2Leaflet.Tooltip
  },
  data: () => ({
    zoom: 14,
    center: [40.4360, -3.6714],
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
  })
}
</script>
