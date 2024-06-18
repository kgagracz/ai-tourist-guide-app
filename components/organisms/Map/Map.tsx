import MapView, { Marker, Region } from 'react-native-maps'
import { Dimensions } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import useUserLocation from '../../../hooks/useUserLocation'
import { parseLocationToRegion } from './Map.util'

type MapProps = {
    fullScreen?: boolean
}

const Map = ({ fullScreen }: MapProps) => {
  const { location, getLocation } = useUserLocation()
  const [currentRegion, setCurrentRegion] = useState<Region | undefined>(undefined)
  const screenHeight = Dimensions.get('window').height
  const map = useRef(null)

  const onRegionChange = (region: Region) => setCurrentRegion(region)

  useEffect(() => {
    getLocation()
    setCurrentRegion(parseLocationToRegion(location))
  }, [])

  return (
    <MapView
      initialRegion={parseLocationToRegion(location)}
      ref={map}
      region={currentRegion}
      onRegionChangeComplete={onRegionChange}
      style={{ height: fullScreen ? screenHeight : 300 }}
    >
      {location && (
      <Marker
        coordinate={location?.coords}
        title="Yor are here"
        description="This is a description"
      />
      )}
    </MapView>
  )
}

export default Map
