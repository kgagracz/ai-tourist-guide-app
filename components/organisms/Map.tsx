import MapView, { Region } from 'react-native-maps'
import { Dimensions } from 'react-native'
import { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import useUserLocation from '../../hooks/useUserLocation'

type MapProps = {
    fullScreen?: boolean
}

const Map = ({ fullScreen }: MapProps) => {
  const { mapRegion, getLocation } = useUserLocation()
  const [currentRegion, setCurrentRegion] = useState<Region | undefined>(undefined)
  const screenHeight = Dimensions.get('window').height
  const onRegionChange = (region: Region) => setCurrentRegion(region)

  useEffect(() => {
    getLocation()
    Geolocation.getCurrentPosition(
      (x) => console.log(x),
      undefined,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
  }, [])

  return (
    <MapView
      initialRegion={mapRegion}
      region={currentRegion}
      onRegionChangeComplete={onRegionChange}
      style={{ height: fullScreen ? screenHeight : 300 }}
    />
  )
}

export default Map
