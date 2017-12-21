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

export function fixMarkerIcons () {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })
}

const MarkerLeafletIcon = ({...props}) => (
  L.icon(
    Object.assign({
      iconSize: [44, 36],
      iconAnchor: [44, 36],
      tooltipAnchor: [0, -22]
    }, props)
  )
)

const markerLeafletIcons = {
  one: MarkerLeafletIcon({iconUrl: OneIcon}),
  two: MarkerLeafletIcon({iconUrl: TwoIcon}),
  three: MarkerLeafletIcon({iconUrl: ThreeIcon}),
  four: MarkerLeafletIcon({iconUrl: FourIcon}),
  editor: MarkerLeafletIcon({
    iconUrl: EditorIcon,
    iconSize: [40, 40],
    iconAnchor: [40, 40]
  })
}

const markerLeafletIconsVisited = {
  one: MarkerLeafletIcon({iconUrl: OneVisitedIcon}),
  two: MarkerLeafletIcon({iconUrl: TwoVisitedIcon}),
  three: MarkerLeafletIcon({iconUrl: ThreeVisitedIcon}),
  four: MarkerLeafletIcon({iconUrl: FourVisitedIcon}),
  editor: MarkerLeafletIcon({
    iconUrl: EditorVisitedIcon,
    iconSize: [40, 40],
    iconAnchor: [40, 40]
  })
}

export function poiLeafletIcon (poi) {
  if (!poi.visit) {
    if (poi.status === 'PEN') { return markerLeafletIcons.editor }
    if (poi.severity === 4) { return markerLeafletIcons.four }
    if (poi.severity === 3) { return markerLeafletIcons.three }
    if (poi.severity === 2) { return markerLeafletIcons.two }
    return markerLeafletIcons.one
  }
  if (poi.status === 'PEN') { return markerLeafletIconsVisited.editor }
  if (poi.severity === 4) { return markerLeafletIconsVisited.four }
  if (poi.severity === 3) { return markerLeafletIconsVisited.three }
  if (poi.severity === 2) { return markerLeafletIconsVisited.two }
  return markerLeafletIcons.one
}

export function poiLatLong (poi) {
  return [poi.location.coordinates[1], poi.location.coordinates[0]]
}
