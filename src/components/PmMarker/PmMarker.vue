<template lang="pug" src='./PmMarker.pug'></template>
<style src='./PmMarker.css' scoped></style>
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
  name: 'PmMarker',
  props: {
    // Customs params
    location: {
      type: Object
    },
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
    tooltip: {
      type: String,
      custom: false
    },
    // From Leaflet marker
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
        if (this.severity === 4) { return markerIcons.four }
        if (this.severity === 3) { return markerIcons.three }
        if (this.severity === 2) { return markerIcons.two }
        return markerIcons.one
      }
      if (this.status === 'PEN') { return markerIconsVisited.editor }
      if (this.severity === 4) { return markerIconsVisited.four }
      if (this.severity === 3) { return markerIconsVisited.three }
      if (this.severity === 2) { return markerIconsVisited.two }
      return markerIcons.one
    }
  },
  components: {
    'vl-marker': Vue2Leaflet.Marker,
    'vl-tooltip': Vue2Leaflet.Tooltip
  }
}
</script>
