import MapView, {
  Callout, Marker, MarkerPressEvent, Region,
} from 'react-native-maps'
import { Dimensions, Text, TouchableHighlight } from 'react-native'
import { useEffect, useRef } from 'react'
import useUserLocation from '../../../hooks/useUserLocation'
import { parseLocationToRegion } from './Map.util'
import { useMapContext } from '../../../context/Map/MapContext'
import { Marker as MarkerType } from '../../../models/Marker'

type MapProps = {
    fullScreen?: boolean
    onMarkerPress?: (event: MarkerPressEvent, marker: MarkerType) => void
}

const Map = ({ fullScreen, onMarkerPress }: MapProps) => {
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
      {markers.map((marker) => {
        const { description, coordinate, title } = marker
        return (
          <Marker
            description={description}
            coordinate={coordinate}
            title={title}
            key={JSON.stringify(marker.coordinate)}
          >
            <Callout onPress={(e) => onMarkerPress?.(e, marker)}>
              <TouchableHighlight>
                <Text>{title}</Text>
              </TouchableHighlight>
            </Callout>
          </Marker>
        )
      })}
    </MapView>
  )
}

export default Map
