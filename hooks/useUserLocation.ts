import { useState } from 'react'
import { getCurrentPositionAsync, LocationObject, requestForegroundPermissionsAsync } from 'expo-location'

const useUserLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null)

  const getLocation = async () => {
    const { status } = await requestForegroundPermissionsAsync()
    if (status !== 'granted') { return null }

    const currentLocation = await getCurrentPositionAsync({})
    setLocation(currentLocation)
    return currentLocation ?? null
  }

  return ({
    location,
    getLocation,
  })
}

export default useUserLocation
