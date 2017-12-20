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

const MarkerIcon = ({...props}) => (
  L.icon(
    Object.assign({
      iconSize: [44, 36],
      iconAnchor: [44, 36],
      tooltipAnchor: [0, -22]
    }, props)
  )
)

const markerSvgIcons = {
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

const markerSvgIconsVisited = {
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

export function poiSvgIcon (poi) {
  if (!poi.visit) {
    if (poi.status === 'PEN') { return markerSvgIcons.editor }
    if (poi.severity === 4) { return markerSvgIcons.four }
    if (poi.severity === 3) { return markerSvgIcons.three }
    if (poi.severity === 2) { return markerSvgIcons.two }
    return markerSvgIcons.one
  }
  if (poi.status === 'PEN') { return markerSvgIconsVisited.editor }
  if (poi.severity === 4) { return markerSvgIconsVisited.four }
  if (poi.severity === 3) { return markerSvgIconsVisited.three }
  if (poi.severity === 2) { return markerSvgIconsVisited.two }
  return markerSvgIcons.one
}

export function poiLatLong (poi) {
  return [poi.location.coordinates[1], poi.location.coordinates[0]]
}
