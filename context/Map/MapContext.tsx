import {
  createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useReducer, useState,
} from 'react'
import { Region } from 'react-native-maps'
import { Marker } from '../../models/Marker'
import { MarkerActionTypes, markerReducer } from './markerReducer'
import { parseAttractionToMarker } from '../../services/marker'
import { getAttractionsByCity } from '../../api/overpass/getAttractionsByCity'
import { getAttractionsByRegion } from '../../api/overpass/getAttractionsByRegion'

type MapContextType = {
    mapRegion: Region | undefined
    setMapRegion: Dispatch<SetStateAction<Region | undefined>>
    markers: Marker[],
    addMarker: (marker: Marker) => void
}

const MapContext = createContext<MapContextType | null>(null)

export const MapContextProvider = ({ children }: PropsWithChildren) => {
  const [mapRegion, setMapRegion] = useState<Region>({
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
    longitude: 21.013982680342046,
    latitude: 52.23055703207284,
  })
  // @ts-ignore
  const [markers, dispatchMarkers] = useReducer(markerReducer, [])

  const addMarker = (marker: Marker) => dispatchMarkers({ type: MarkerActionTypes.ADD_MARKER, payload: marker })

  const fetchAllMarkers = async () => {
    const attractions = await getAttractionsByCity()
    const markers = attractions.map(parseAttractionToMarker)
    dispatchMarkers({ type: MarkerActionTypes.SET_MARKERS, payload: markers })
  }
  const onRegionChange = async (region: Region) => {
    setMapRegion(region)
    if (region.latitudeDelta > 0.2 || region.longitudeDelta > 0.16) {
      return
    }

    const attractions = await getAttractionsByRegion(region)
    const markers = attractions?.map(parseAttractionToMarker)
    console.log(markers)
    dispatchMarkers({ type: MarkerActionTypes.SET_MARKERS, payload: markers ?? [] })
  }

  return (
    <MapContext.Provider value={{
      mapRegion,
      setMapRegion,
      markers,
      addMarker,
      onRegionChange,
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
