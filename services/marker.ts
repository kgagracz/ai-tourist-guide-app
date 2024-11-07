import { Region } from 'react-native-maps'
import { Attraction } from '../models/Attraction'
import { Marker } from '../models/Marker'
import { mapDelta } from '../components/organisms/Map/Map.Const'

export const parseAttractionToMarker = (attraction: Attraction): Marker => ({
  attractionId: attraction.id,
  title: attraction.name,
  description: attraction.city,
  coordinate: {
    latitude: attraction.location.latitude,
    longitude: attraction.location.longitude,
  },
})

export const parseAttractionsToMarkers = (attractions: Attraction[]): Marker[] => attractions.map(parseAttractionToMarker)

export const getRegionFromMarker = ({ coordinate }: Marker): Region => ({
  longitude: coordinate.longitude,
  latitude: coordinate.latitude,
  latitudeDelta: mapDelta,
  longitudeDelta: mapDelta,
})
