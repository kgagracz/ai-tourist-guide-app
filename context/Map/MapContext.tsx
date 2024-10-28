import {
  createContext, PropsWithChildren, Ref, useContext, useReducer, useRef,
} from 'react'
import MapView, { Region } from 'react-native-maps'
import { Marker } from '../../models/Marker'
import { MarkerActionTypes, markerReducer } from './markerReducer'
import { parseAttractionToMarker } from '../../services/marker'
import { getAttractionsByCity } from '../../api/overpass/getAttractionsByCity'
import { getAttractionsByRegion } from '../../api/overpass/getAttractionsByRegion'

type MapContextType = {
    moveMapToRegion: (region: Region) => void
    markers: Marker[],
    addMarker: (marker: Marker) => void
    mapRef: Ref<MapView>
    fetchMarkersByRegion: (region: Region) => Promise<void>
}

const MapContext = createContext<MapContextType | null>(null)

export const MapContextProvider = ({ children }: PropsWithChildren) => {
  const mapRef = useRef(null)
  // @ts-ignore
  const [markers, dispatchMarkers] = useReducer(markerReducer, [])
  const addMarker = (marker: Marker) => dispatchMarkers({ type: MarkerActionTypes.ADD_MARKER, payload: marker })

  const moveMapToRegion = (region: Region) => {
    if (!mapRef.current) {
      return
    }
    mapRef.current.animateToRegion(region)
  }

  const fetchAllMarkers = async () => {
    const attractions = await getAttractionsByCity()
    const markers = attractions.map(parseAttractionToMarker)
    dispatchMarkers({ type: MarkerActionTypes.SET_MARKERS, payload: markers })
  }
  const fetchMarkersByRegion = async (region: Region) => {
    if (region.latitudeDelta > 0.2 || region.longitudeDelta > 0.16) {
      return
    }

    const attractions = await getAttractionsByRegion(region)
    const markers = attractions?.map(parseAttractionToMarker)
    dispatchMarkers({ type: MarkerActionTypes.SET_MARKERS, payload: markers ?? [] })
  }

  return (
    <MapContext.Provider value={{
      moveMapToRegion,
      mapRef,
      markers,
      addMarker,
      fetchMarkersByRegion,
    }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMapContext must be used within MapContextProvider.')
  }
  return context
}
