import MapView, { Marker, Region } from 'react-native-maps'
import { Dimensions } from 'react-native'
import { useEffect, useRef } from 'react'
import useUserLocation from '../../../hooks/useUserLocation'
import { parseLocationToRegion } from './Map.util'
import { useMapContext } from '../../../context/Map/MapContext'

type MapProps = {
    fullScreen?: boolean
}

const Map = ({ fullScreen }: MapProps) => {
  const { location, getLocation } = useUserLocation()
  const { mapRegion, setMapRegion, markers } = useMapContext()
  const screenHeight = Dimensions.get('window').height
  const map = useRef(null)

  const onRegionChange = (region: Region) => setMapRegion(region)

  useEffect(() => {
    getLocation()
    setMapRegion(parseLocationToRegion(location))
  }, [])

  return (
    <MapView
      initialRegion={parseLocationToRegion(location)}
      ref={map}
      region={mapRegion}
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
      {markers.map((marker) => (<Marker {...marker} />))}
    </MapView>
  )
}

export default Map
