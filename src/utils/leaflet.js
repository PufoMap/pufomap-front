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

const MarkerLeafletIcon = ({isSelected, isNew, ...props}) => {
  return L.icon(
    Object.assign({
      iconSize: [44, 36],
      iconAnchor: [44, 36],
      tooltipAnchor: [0, -22],
      className: isSelected ? 'selected-marker' : isNew ? 'new-marker' : ''
    }, props)
  )
}

export function newPOIMLeafletIcon (...props) {
  return MarkerLeafletIcon({
    iconUrl: EditorIcon,
    isNew: true,
    iconSize: [40, 40],
    iconAnchor: [40, 40],
    ...props
  })
}
export function poimLeafletIcon (poim, isSelected = false, ...props) {
  if (!poim.isVisited) {
    if (poim.status === 'PEN') {
      return MarkerLeafletIcon({
        iconUrl: EditorIcon,
        isSelected: isSelected,
        iconSize: [40, 40],
        iconAnchor: [40, 40],
        ...props
      })
    }
    if (poim.severity === 4) {
      return MarkerLeafletIcon({ iconUrl: FourIcon, isSelected: isSelected, ...props })
    }
    if (poim.severity === 3) {
      return MarkerLeafletIcon({ iconUrl: ThreeIcon, isSelected: isSelected, ...props })
    }
    if (poim.severity === 2) {
      return MarkerLeafletIcon({ iconUrl: TwoIcon, isSelected: isSelected, ...props })
    }
    return MarkerLeafletIcon({
      iconUrl: OneIcon,
      isSelected: isSelected,
      ...props
    })
  }
  if (poim.status === 'PEN') {
    return MarkerLeafletIcon({
      iconUrl: EditorVisitedIcon,
      isSelected: isSelected,
      iconSize: [40, 40],
      iconAnchor: [40, 40],
      ...props
    })
  }
  if (poim.severity === 4) {
    return MarkerLeafletIcon({ iconUrl: FourVisitedIcon, isSelected: isSelected, ...props })
  }
  if (poim.severity === 3) {
    return MarkerLeafletIcon({ iconUrl: ThreeVisitedIcon, isSelected: isSelected, ...props })
  }
  if (poim.severity === 2) {
    return MarkerLeafletIcon({ iconUrl: TwoVisitedIcon, isSelected: isSelected, ...props })
  }
  return MarkerLeafletIcon({
    iconUrl: OneVisitedIcon,
    isSelected: isSelected,
    ...props
  })
}

export function poimLatLong (poim) {
  if (poim.location) {
    return [poim.location.coordinates[1], poim.location.coordinates[0]]
  }
  if (poim.lat !== undefined && poim.lng !== undefined) {
    return [poim.lat, poim.lng]
  }
  return [0, 0]
}

export function calculateLatLngWithOffset (map, latlng) {
  const markerPoint = map.latLngToContainerPoint(L.latLng(latlng))

  if (typeof window.orientation !== 'undefined') {
    // Mobile / Tablet
    // TODO: Calculate the magic number (+180, related with the screen size).
    //       Control screen orientation.
    return map.containerPointToLatLng(
      L.point(
        markerPoint.x,
        markerPoint.y + 180
      )
    )
  }

  // PC
  // TODO: Calculate the magic number (+300, related with the screen size).
  return map.containerPointToLatLng(
    L.point(
      markerPoint.x + 300,
      markerPoint.y
    )
  )
}
