import { LocationObject } from 'expo-location'
import { Region } from 'react-native-maps'

export const parseLocationToRegion = (location: LocationObject | null): Region | undefined => {
  if (!location) { return }
  const { coords: { latitude, longitude } } = location
  return {
    latitude, longitude, longitudeDelta: 0.01, latitudeDelta: 0.01,
  }
}
