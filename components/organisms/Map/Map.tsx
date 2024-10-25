import MapView, { Callout, Marker, MarkerPressEvent } from 'react-native-maps'
import { Dimensions, Text, TouchableHighlight } from 'react-native'
import { useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
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
  const {
    moveMapToRegion, markers, fetchMarkersByRegion, mapRef,
  } = useMapContext()
  const { theme } = useTheme()
  const screenHeight = Dimensions.get('window').height

  useEffect(() => {
    getLocation()
    const userRegion = parseLocationToRegion(location)
    if (!userRegion) { return }
    moveMapToRegion(userRegion)
  }, [])

  return (
    <MapView
      ref={mapRef}
      onRegionChangeComplete={fetchMarkersByRegion}
      style={{ height: fullScreen ? screenHeight : 300 }}
      userInterfaceStyle={theme}
    >
      {location && (
      <Marker
        /* eslint-disable react/jsx-curly-brace-presence */
        pinColor={'gold'}
        coordinate={location?.coords}
        title="Jesteś tutaj"
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
