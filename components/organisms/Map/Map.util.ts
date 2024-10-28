import { LocationObject } from 'expo-location'
import { Region } from 'react-native-maps'
import { mapDelta } from './Map.Const'
import { Attraction } from '../../../models/Attraction'

export const parseLocationToRegion = (location: LocationObject | null): Region | undefined => {
  if (!location) { return }
  const { coords: { latitude, longitude } } = location
  return {
    latitude, longitude, longitudeDelta: mapDelta, latitudeDelta: mapDelta,
  }
}

export const parseAttractionLocationToRegion = (
  location: Attraction['location'],
  delta: {
      latitudeDelta: Region['latitudeDelta'],
      longitudeDelta: Region['longitudeDelta']
    } = { latitudeDelta: mapDelta, longitudeDelta: mapDelta },
): Region => ({
  longitude: location.longitude,
  latitude: location.latitude,
  ...delta,
})
