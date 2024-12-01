import { useCallback, useState } from 'react'
import {
  getCurrentPositionAsync,
  LocationObject,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from 'expo-location'
import { LocationAccuracy } from 'expo-location/src/Location'

const useUserLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null)

  const getCurrentLocation = useCallback(async () => {
    const { status } = await requestForegroundPermissionsAsync()
    if (status !== 'granted') { return null }

    const currentLocation = await getCurrentPositionAsync({})
    setLocation(currentLocation)
    return currentLocation ?? null
  }, [])

  const watchPosition = useCallback(async () => watchPositionAsync({ accuracy: LocationAccuracy.Highest }, setLocation), [])

  return ({
    location,
    getLocation: getCurrentLocation,
    watchPosition,
  })
}

export default useUserLocation
