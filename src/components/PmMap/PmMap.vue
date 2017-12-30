<template lang="pug" src='./PmMap.pug'></template>
<style src='./PmMap.css' scoped></style>

<script>

import { mapActions, mapGetters } from 'vuex'
import Vue2Leaflet from 'vue2-leaflet'

import { poiLeafletIcon, poiLatLong, calculateLatLngWithOffset } from '@/utils/leaflet'

import PmMarkerInfoBox from '@/components/PmMarkerInfoBox/PmMarkerInfoBox'

export default {
  name: 'PmMap',
  data: () => ({
    zoom: 10,
    center: [40.4360, -3.6714],
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri & Co.',
    options: {
      maxBoundsViscosity: 1
    }
  }),
  computed: {
    ...mapGetters({
      filters: 'map/filters',
      pois: 'map/pois',
      newPoi: 'map/newPoi',
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
      changeBoundingBox: 'map/changeBoundingBox',
      setNewPoi: 'map/setNewPoi',
      selectPOI: 'map/selectPOI'
    }),
    poiLeafletIcon,
    poiLatLong,
    handleChangeBoundingBox (event) {
      this.changeBoundingBox(this.map.getBounds())
    },
    handleClickMarker (event, id) {
      this.map.panTo(calculateLatLngWithOffset(this.map, event.latlng), {animate: true})
      this.changeBoundingBox(this.map.getBounds())
      this.selectPOI(id)
    },
    handleContextMenu (event) {
      this.setNewPoi({
        visit: false,
        severity: 1,
        location: {
          type: 'Point',
          coordinates: [event.latlng.lng, event.latlng.lat]
        }
      })
    },
    handleClickNewMarker (event) {
      this.setNewPoi(null)
    }
  },
  mounted () {
    this.map = this.$refs.map.mapObject

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const success = (pos) => {
      var crd = pos.coords

      console.info(`Geolocationing to ${crd.latitude}, ${crd.longitude} (+/- ${crd.accuracy} m.)`)
      this.center = [crd.latitude, crd.longitude]
      this.changeBoundingBox(this.$refs.map.mapObject.getBounds())
    }

    const error = (error) => {
      console.warn(`Geolocationing errpr: ${error.message} [ERROR:(${error.code})] `)
      this.changeBoundingBox(this.$refs.map.mapObject.getBounds())
    }

    if (navigator && navigator.geolocation) {
      // The browser support geolocation
      navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
      // The browser has not geolocation
      this.changeBoundingBox(this.$refs.map.mapObject.getBounds())
    }
  },
  components: {
    'vl-map': Vue2Leaflet.Map,
    'vl-tilelayer': Vue2Leaflet.TileLayer,
    'vl-marker': Vue2Leaflet.Marker,
    'pm-marker-infobox': PmMarkerInfoBox
  }
}
</script>
