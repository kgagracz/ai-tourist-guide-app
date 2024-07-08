import {
  createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useReducer, useState,
} from 'react'
import { Region } from 'react-native-maps'
import { Marker } from '../../models/Marker'
import { MarkerActionTypes, markerReducer } from './markerReducer'

type MapContextType = {
    mapRegion: Region | undefined
    setMapRegion: Dispatch<SetStateAction<Region | undefined>>
    markers: Marker[],
    addMarker: (marker: Marker) => void
}

const MapContext = createContext<MapContextType | null>(null)

export const MapContextProvider = ({ children }: PropsWithChildren) => {
  const [mapRegion, setMapRegion] = useState<Region>()
  // @ts-ignore
  const [markers, dispatchMarkers] = useReducer(markerReducer, [])

  const addMarker = (marker: Marker) => dispatchMarkers({ type: MarkerActionTypes.ADD_MARKER, payload: marker })

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MapContext.Provider value={{
      mapRegion,
      setMapRegion,
      markers,
      addMarker,
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
