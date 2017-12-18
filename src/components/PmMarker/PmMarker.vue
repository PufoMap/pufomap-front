<template src='./PmMarker.html'></template>
<script>
import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'

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
      iconSize: [37, 30],
      iconAnchor: [37, 30],
      popupAnchor: [0, -28]
    }, props)
  )
)

const markerIcons = {
  one: MarkerIcon({iconUrl: OneIcon}),
  two: MarkerIcon({iconUrl: TwoIcon}),
  three: MarkerIcon({iconUrl: ThreeIcon}),
  four: MarkerIcon({iconUrl: FourIcon}),
  editor: MarkerIcon({iconUrl: EditorIcon})
}

const markerIconsVisited = {
  one: MarkerIcon({iconUrl: OneVisitedIcon}),
  two: MarkerIcon({iconUrl: TwoVisitedIcon}),
  three: MarkerIcon({iconUrl: ThreeVisitedIcon}),
  four: MarkerIcon({iconUrl: FourVisitedIcon}),
  editor: MarkerIcon({iconUrl: EditorVisitedIcon})
}

export default {
  name: 'PmMap',
  props: {
    // Customs
    status: {
      type: String,
      custom: false,
      default: 'PUB'
    },
    severity: {
      type: Number,
      custom: false,
      default: 100
    },
    visited: {
      type: Boolean,
      custom: true,
      default: false
    },
    // From Default marker
    latLng: {
      type: [Object, Array]
    },
    draggable: {
      type: Boolean,
      custom: true,
      default: false
    },
    visible: {
      type: Boolean,
      custom: true,
      default: true
    },
    zIndexOffset: {
      type: Number,
      custom: false
    },
    options: {
      custom: true,
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    icon () {
      if (!this.visited) {
        if (this.status === 'PEN') { return markerIcons.editor }
        if (this.severity <= 25) { return markerIcons.one }
        if (this.severity <= 50) { return markerIcons.two }
        if (this.severity <= 75) { return markerIcons.three }
        return markerIcons.four
      }
      if (this.status === 'PEN') { return markerIconsVisited.editor }
      if (this.severity <= 25) { return markerIconsVisited.one }
      if (this.severity <= 50) { return markerIconsVisited.two }
      if (this.severity <= 75) { return markerIconsVisited.three }
      return markerIcons.four
    }
  },
  components: {
    'vl-marker': Vue2Leaflet.Marker
  }
}
</script>
