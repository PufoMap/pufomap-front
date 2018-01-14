<template lang="pug" src='./MmMap.pug'></template>
<style src='./MmMap.css' scoped></style>

<script>

import { mapActions, mapMutations, mapGetters } from 'vuex'
import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'

import { newPoimLeafletIcon, poimLeafletIcon, poimLatLong, calculateLatLngWithOffset } from '@/utils/leaflet'

import MmPOIMInfoBox from '@/components/MmPOIMInfoBox/MmPOIMInfoBox'

export default {
  name: 'MmMap',
  data: () => ({
    zoom: 10,
    minZoom: 3,
    center: [40.4360, -3.6714],
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri & Co.',
    options: {
      maxBoundsViscosity: 1.0
    },
    newMarkerOptions: {
      opacity: 0.5
    },
    newMarkerPopupOptions: {
      closeButton: false,
      closeOnClick: false,
      offset: L.point(-18, -10)
    }
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      filters: 'map/filters',
      poims: 'map/poims',
      selectedPoim: 'map/selectedPoim',
      newPoim: 'map/newPoim',
      newPoimExist: 'map/newPoimExist',
      newPoimFormVisible: 'map/newPoimFormVisible'
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
      setNewPoim: 'map/setNewPoim',
      selectPOIM: 'map/selectPOIM'
    }),
    ...mapMutations({
      setNewPoimFormVisibility: 'map/SET_NEW_POIM_FORM_VISIBILITY'
    }),
    newPoimLeafletIcon,
    poimLeafletIcon,
    poimLatLong,
    handleChangeBoundingBox (event) {
      this.changeBoundingBox(this.map.getBounds())
    },
    handleClickMarker (event, id) {
      this.map.panTo(calculateLatLngWithOffset(this.map, event.latlng), {animate: true})
      this.changeBoundingBox(this.map.getBounds())
      this.selectPOIM(id)
    },
    handleContextMenu (event) {
      if (!this.isAuthenticated) {
        return
      }

      // Create new POIM
      this.setNewPoim({
        visit: this.newPoim.visit || false,
        severity: this.newPoim.severity || 1,
        location: {
          type: 'Point',
          coordinates: [event.latlng.lng, event.latlng.lat]
        }
      })

      // Centrr map
      this.map.panTo(event.latlng, {animate: true})
      this.changeBoundingBox(this.map.getBounds())
    },
    handleAddNewMarker (event) {
      this.$refs.newPoimMarker.mapObject.openPopup()
    },
    handleClickNewMarkerAdd (event) {
      this.setNewPoimFormVisibility(true)
      this.$refs.newPoimMarker.mapObject.closePopup()
    },
    handleClickNewMarkerCancel (event) {
      this.setNewPoim({})
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
    'vl-popup': Vue2Leaflet.Popup,
    'mm-marker-infobox': MmPOIMInfoBox
  }
}
</script>
