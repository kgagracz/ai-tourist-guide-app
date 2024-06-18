import { useState } from 'react'
import { PermissionsAndroid } from 'react-native'
import { GeoError, GeoPosition, getCurrentPosition } from 'react-native-geolocation-service'
import { Region } from 'react-native-maps'

const useUserLocation = () => {
  const [location, setLocation] = useState<GeoPosition>()

  // todo - ios
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      return granted === 'granted'
    } catch (err) {
      return false
    }
  }

  const onSuccess = (position: GeoPosition) => {
    console.log(position)
    setLocation(position)
  }
  const onError = (error: GeoError) => {
    console.log(error)
  }

  const getLocation = async () => {
    const canAccessLocation = await requestLocationPermission()
    console.log('canAccessLocation', canAccessLocation)
    await getCurrentPosition(
      onSuccess,
      onError,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
  }

  const mapRegion: Region | undefined = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  } : undefined

  return { mapRegion, getLocation }
}

export default useUserLocation
