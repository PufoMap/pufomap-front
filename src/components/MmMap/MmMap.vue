<template lang="pug" src='./MmMap.pug'></template>
<style src='./MmMap.css' scoped></style>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'

import { newPOIMLeafletIcon, poimLeafletIcon, poimLatLong, calculateLatLngWithOffset } from '@/utils/leaflet'

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
      selectedPOIM: 'map/selectedPOIM',
      newPOIM: 'map/newPOIM',
      newPOIMExist: 'map/newPOIMExist',
      newPOIMFormVisible: 'map/newPOIMFormVisible'
    })
  },
  watch: {
    filters (newVal, oldVal) {
      if (newVal && oldVal) {
        this.resetMap()
      }
    },
    selectedPOIM (newVal, oldVal) {
      if (newVal) {
        // Center map
        const latlng = { lat: newVal.location.coordinates[1], lng: newVal.location.coordinates[0] }
        this.map.panTo(calculateLatLngWithOffset(this.map, latlng, {animate: true}))
        this.changeBoundingBox(this.map.getBounds())
      }
    }
  },
  methods: {
    ...mapActions({
      resetMap: 'map/resetMap',
      changeBoundingBox: 'map/changeBoundingBox',
      selectPOIM: 'map/selectPOIM'
    }),
    ...mapMutations({
      setNewPOIMFormVisibility: 'map/SET_NEW_POIM_FORM_VISIBILITY',
      setNewPOIM: 'map/SET_NEW_POIM'
    }),
    newPOIMLeafletIcon,
    poimLeafletIcon,
    poimLatLong,
    handleChangeBoundingBox (event) {
      this.changeBoundingBox(this.map.getBounds())
    },
    handleClickMarker (event, slug) {
      this.selectPOIM(slug)
    },
    handleContextMenu (event) {
      if (!this.isAuthenticated) {
        return
      }

      // Create new POIM
      this.setNewPOIM({
        location: {
          type: 'Point',
          coordinates: [event.latlng.lng, event.latlng.lat]
        }
      })

      // Close POIM Info Box if it is open
      if (this.selectPOIM) {
        this.setNewPOIM(null)
      }

      // Center map
      this.map.panTo(event.latlng, {animate: true})
      this.changeBoundingBox(this.map.getBounds())
    },
    handleAddNewMarker (event) {
      this.$refs.newPOIMMarker.mapObject.openPopup()
    },
    handleClickNewMarkerAdd (event) {
      this.setNewPOIMFormVisibility(true)
      this.$refs.newPOIMMarker.mapObject.closePopup()
    },
    handleClickNewMarkerCancel (event) {
      this.setNewPOIM(null)
    }
  },
  mounted () {
    this.map = this.$refs.map.mapObject

    if (!this.$route.params.slug) {
      if (navigator && navigator.geolocation) {
        // The browser support geolocation
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

        navigator.geolocation.getCurrentPosition(success, error, options)
      } else {
        // The browser has not geolocation
        this.changeBoundingBox(this.$refs.map.mapObject.getBounds())
      }
    } else {
      // A POIM is selected
      this.selectPOIM(this.$route.params.slug)
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
