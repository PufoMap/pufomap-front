<template lang="pug" src='./PmMap.pug'></template>
<style src='./PmMap.css' scoped></style>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue2Leaflet from 'vue2-leaflet'

import { poiLeafletIcon, poiLatLong } from '@/utils/leaflet'

import PmMarkerInfoBox from '@/components/PmMarkerInfoBox/PmMarkerInfoBox'

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
      filters: 'map/filters',
      pois: 'map/pois',
      selectedPoi: 'map/selectedPoi'
    })
  },
  watch: {
    filters (newVal, oldVal) {
      if (newVal && oldVal) {
        this.resetMap()
      }
    }
  },
  methods: {
    ...mapActions({
      resetMap: 'map/resetMap',
      getPOIs: 'map/getPOIs',
      selectPOI: 'map/selectPOI'
    }),
    poiLeafletIcon,
    poiLatLong,
    handleClickMarker (event, id) {
      this.selectPOI(id)
    }
  },
  mounted () {
    // if (navigator && navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (pos) => {
    //       this.center = [pos.coords.latitude, pos.coords.longitude]
    //       this.getPOIs()
    //     }
    //   )
    // } else {
    //   this.getPOIs()
    // }
    this.getPOIs()
  },
  components: {
    'vl-map': Vue2Leaflet.Map,
    'vl-tilelayer': Vue2Leaflet.TileLayer,
    'vl-marker': Vue2Leaflet.Marker,
    'pm-marker-infobox': PmMarkerInfoBox
  }
}
</script>
