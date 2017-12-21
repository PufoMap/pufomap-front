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

const MarkerLeafletIcon = ({isSelected, ...props}) => {
  return L.icon(
    Object.assign({
      iconSize: [44, 36],
      iconAnchor: [44, 36],
      tooltipAnchor: [0, -22],
      className: isSelected ? 'selected-marker' : ''
    }, props)
  )
}

export function poiLeafletIcon (poi, isSelected = false) {
  if (!poi.visit) {
    if (poi.status === 'PEN') {
      return MarkerLeafletIcon({
        iconUrl: EditorIcon,
        isSelected: isSelected,
        iconSize: [40, 40],
        iconAnchor: [40, 40]
      })
    }
    if (poi.severity === 4) {
      return MarkerLeafletIcon({ iconUrl: FourIcon, isSelected: isSelected })
    }
    if (poi.severity === 3) {
      return MarkerLeafletIcon({ iconUrl: ThreeIcon, isSelected: isSelected })
    }
    if (poi.severity === 2) {
      return MarkerLeafletIcon({ iconUrl: TwoIcon, isSelected: isSelected })
    }
    return MarkerLeafletIcon({
      iconUrl: OneIcon,
      isSelected: isSelected
    })
  }
  if (poi.status === 'PEN') {
    return MarkerLeafletIcon({
      iconUrl: EditorVisitedIcon,
      isSelected: isSelected,
      iconSize: [40, 40],
      iconAnchor: [40, 40]
    })
  }
  if (poi.severity === 4) {
    return MarkerLeafletIcon({ iconUrl: FourVisitedIcon, isSelected: isSelected })
  }
  if (poi.severity === 3) {
    return MarkerLeafletIcon({ iconUrl: ThreeVisitedIcon, isSelected: isSelected })
  }
  if (poi.severity === 2) {
    return MarkerLeafletIcon({ iconUrl: TwoVisitedIcon, isSelected: isSelected })
  }
  return MarkerLeafletIcon({
    iconUrl: OneVisitedIcon,
    isSelected: isSelected
  })
}

export function poiLatLong (poi) {
  return [poi.location.coordinates[1], poi.location.coordinates[0]]
}
