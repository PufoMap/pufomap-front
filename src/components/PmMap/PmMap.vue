<template lang="pug" src='./PmMap.pug'></template>
<style src='./PmMap.css' scoped></style>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'

import PmMarkerInfoBox from '@/components/PmMarkerInfoBox/PmMarkerInfoBox'

import OneIcon from '@/assets/img/markers/1-mark.svg'
import TwoIcon from '@/assets/img/markers/2-mark.svg'
import ThreeIcon from '@/assets/img/markers/3-mark.svg'
import FourIcon from '@/assets/img/markers/4-mark.svg'
import EditorIcon from '@/assets/img/markers/editor-mark.svg'

import OneVisitedIcon from '@/assets/img/markers/1-mark-visited.svg'
import TwoVisitedIcon from '@/assets/img/markers/2-mark-visited.svg'
import ThreeVisitedIcon from '@/assets/img/markers/3-mark-visited.svg'
import FourVisitedIcon from '@/assets/img/markers/4-mark-visited.svg'
import EditorVisitedIcon from '@/assets/img/markers/editor-mark-visited.svg'

const MarkerIcon = ({...props}) => (
  L.icon(
    Object.assign({
      iconSize: [44, 36],
      iconAnchor: [44, 36],
      tooltipAnchor: [0, -22]
    }, props)
  )
)

const markerIcons = {
  one: MarkerIcon({iconUrl: OneIcon}),
  two: MarkerIcon({iconUrl: TwoIcon}),
  three: MarkerIcon({iconUrl: ThreeIcon}),
  four: MarkerIcon({iconUrl: FourIcon}),
  editor: MarkerIcon({
    iconUrl: EditorIcon,
    iconSize: [40, 40],
    iconAnchor: [40, 40]
  })
}

const markerIconsVisited = {
  one: MarkerIcon({iconUrl: OneVisitedIcon}),
  two: MarkerIcon({iconUrl: TwoVisitedIcon}),
  three: MarkerIcon({iconUrl: ThreeVisitedIcon}),
  four: MarkerIcon({iconUrl: FourVisitedIcon}),
  editor: MarkerIcon({
    iconUrl: EditorVisitedIcon,
    iconSize: [40, 40],
    iconAnchor: [40, 40]
  })
}

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
    }),
    poiIcon (poi) {
      if (!poi.visited) {
        if (poi.status === 'PEN') { return markerIcons.editor }
        if (poi.severity === 4) { return markerIcons.four }
        if (poi.severity === 3) { return markerIcons.three }
        if (poi.severity === 2) { return markerIcons.two }
        return markerIcons.one
      }
      if (poi.status === 'PEN') { return markerIconsVisited.editor }
      if (poi.severity === 4) { return markerIconsVisited.four }
      if (poi.severity === 3) { return markerIconsVisited.three }
      if (poi.severity === 2) { return markerIconsVisited.two }
      return markerIcons.one
    },
    poiLatLong (poi) {
      return [poi.location.coordinates[1], poi.location.coordinates[0]]
    }
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
    'vl-marker': Vue2Leaflet.Marker,
    'pm-marker-infobox': PmMarkerInfoBox
  }
}
</script>
