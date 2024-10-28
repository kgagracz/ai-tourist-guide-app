import {
  createContext, PropsWithChildren, Ref, useContext, useReducer, useRef,
} from 'react'
import MapView, { Region } from 'react-native-maps'
import { Marker } from '../../models/Marker'
import { MarkerActionTypes, markerReducer } from './markerReducer'

type MapContextType = {
    moveMapToRegion: (region: Region) => void
    markers: Marker[],
    addMarker: (marker: Marker) => void
    mapRef: Ref<MapView>
    setMarkers: (markers: Marker[]) => void
}

const MapContext = createContext<MapContextType | null>(null)

export const MapContextProvider = ({ children }: PropsWithChildren) => {
  const mapRef = useRef<MapView | null>(null)
  // @ts-ignore
  const [markers, dispatchMarkers] = useReducer(markerReducer, [])

  // @ts-ignore
  const addMarker = (marker: Marker) => dispatchMarkers({
    type: MarkerActionTypes.ADD_MARKER,
    payload: marker,
  })

  // @ts-ignore
  const setMarkers = (markers: Marker[]) => dispatchMarkers({
    type: MarkerActionTypes.SET_MARKERS,
    payload: markers ?? [],
  })

  const moveMapToRegion = (region: Region) => {
    if (!mapRef.current) {
      return
    }
    mapRef.current.animateToRegion(region)
  }

  return (
    <MapContext.Provider value={{
      moveMapToRegion,
      mapRef,
      markers,
      addMarker,
      setMarkers,
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
