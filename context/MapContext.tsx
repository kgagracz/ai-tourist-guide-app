import {
  createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState,
} from 'react'
import { Region } from 'react-native-maps'

type MapContextType = {
    mapRegion: Region | undefined
    setMapRegion: Dispatch<SetStateAction<Region | undefined>>
}

const MapContext = createContext<MapContextType | null>(null)

export const MapContextProvider = ({ children }: PropsWithChildren) => {
  const [mapRegion, setMapRegion] = useState<Region>()
  // todo - marker type
  const [markers, setMarkers] = useState()

  return <MapContext.Provider value={{ mapRegion, setMapRegion }}>{children}</MapContext.Provider>
}

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMapContext must be used within MapContextProvider.')
  }
  return context
}
