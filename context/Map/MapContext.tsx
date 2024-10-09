import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Region } from 'react-native-maps'
import { Marker } from '../../models/Marker'
import { MarkerActionTypes, markerReducer } from './markerReducer'
import { getAllAttractions } from '../../api/attraction.api'
import { parseAttractionToMarker } from '../../services/marker'

type MapContextType = {
    mapRegion: Region | undefined
    setMapRegion: Dispatch<SetStateAction<Region | undefined>>
    markers: Marker[],
    addMarker: (marker: Marker) => void
}

const MapContext = createContext<MapContextType | null>(null)

export const MapContextProvider = ({ children }: PropsWithChildren) => {
  const [mapRegion, setMapRegion] = useState<Region>({
    latitudeDelta: 10,
    longitudeDelta: 10,
    longitude: 21.013982680342046,
    latitude: 52.23055703207284,
  })
  // @ts-ignore
  const [markers, dispatchMarkers] = useReducer(markerReducer, [])

  const addMarker = (marker: Marker) => dispatchMarkers({ type: MarkerActionTypes.ADD_MARKER, payload: marker })

  const fetchAllMarkers = async () => {
    const attractions = await getAllAttractions()
    const markers = attractions.map(parseAttractionToMarker)
    dispatchMarkers({ type: MarkerActionTypes.SET_MARKERS, payload: markers })
  }

  useEffect(() => {
    fetchAllMarkers()
  }, [])

  return (
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
