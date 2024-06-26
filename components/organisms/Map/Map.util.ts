import { LocationObject } from 'expo-location'
import { Region } from 'react-native-maps'
import { mapDelta } from './Map.Const'

export const parseLocationToRegion = (location: LocationObject | null): Region | undefined => {
  if (!location) { return }
  const { coords: { latitude, longitude } } = location
  return {
    latitude, longitude, longitudeDelta: mapDelta, latitudeDelta: mapDelta,
  }
}
