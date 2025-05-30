import MapView, { Marker, MarkerPressEvent, Region } from 'react-native-maps'
import { Dimensions } from 'react-native'
import { useCallback, useEffect, useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { AxiosResponse } from 'axios'
import { LocationObject } from 'expo-location'
import useUserLocation from '../../../hooks/useUserLocation'
import { parseLocationToRegion } from './Map.util'
import { useMapContext } from '../../../context/Map/MapContext'
import { Marker as MarkerType } from '../../../models/Marker'
import { parseAttractionsToMarkers } from '../../../services/marker'
import { OverpassResponse } from '../../../api/overpass/models/OverpassResponse'
import { useGetMarkersByCoords } from '../../../api/overpass/hooks/useGetMarkersByCoords'
import { parseOverpassResponse } from '../../../api/overpass/services/utils'
import { MapFloatingButtons } from './MapFloatingButtons/MapFloatingButtons'

type MapProps = {
    fullScreen?: boolean
    onMarkerPress?: (event: MarkerPressEvent, marker: MarkerType) => void
}

const Map = ({ fullScreen, onMarkerPress }: MapProps) => {
  const { location, getLocation, watchPosition } = useUserLocation()
  const {
    moveMapToRegion, markers, mapRef, setMarkers,
  } = useMapContext()

  const onFetchAttractionsSuccess = (data: AxiosResponse<OverpassResponse>) => {
    setMarkers(parseAttractionsToMarkers(parseOverpassResponse(data)))
  }

  const {
    mutate: fetchMarkers,
    isPending,
  } = useGetMarkersByCoords(onFetchAttractionsSuccess)
  const theme = useTheme()
  const screenHeight = Dimensions.get('window').height

  const onRegionChangeComplete = (newRegion: Region) => {
    const enabled = newRegion.latitudeDelta < 0.2 && newRegion.longitudeDelta < 0.16
    if (!enabled) { return }
    fetchMarkers(newRegion)
  }

  const centerToUserLocation = useCallback((userLocation: LocationObject | null) => {
    const userRegion = parseLocationToRegion(userLocation)
    if (!userRegion) { return }
    moveMapToRegion(userRegion)
  }, [moveMapToRegion])

  const initUserLocation = useCallback(async () => {
    const location = await getLocation()
    centerToUserLocation(location)
  }, [centerToUserLocation, getLocation])

  useEffect(() => {
    initUserLocation()
  }, [])

  useEffect(() => {
    watchPosition()
  }, [])

  const buttons = useMemo(() => ([
    {
      onPress: () => {
        centerToUserLocation(location)
      },
      icon: 'my-location',
    },
  ]), [centerToUserLocation, location])

  return (
    <>
      <MapFloatingButtons buttons={buttons} />
      <MapView
        ref={mapRef}
        onRegionChangeComplete={onRegionChangeComplete}
        style={{ height: fullScreen ? screenHeight : 300 }}
        userInterfaceStyle={theme.dark ? 'dark' : 'light'}
        loadingEnabled={isPending}
        loadingIndicatorColor="red"
        showsUserLocation
      >
        {markers.map((marker) => {
          const { description, coordinate } = marker
          return (
            <Marker
              description={description}
              coordinate={coordinate}
              key={JSON.stringify(marker.coordinate)}
              onPress={(e) => onMarkerPress?.(e, marker)}
            />
          )
        })}
      </MapView>
    </>
  )
}

export default Map
