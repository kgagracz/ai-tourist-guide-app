import { Attraction } from '../models/Attraction'
import { Marker } from '../models/Marker'

export const parseAttractionToMarker = (attraction: Attraction): Marker => ({
  attractionId: attraction.id,
  title: attraction.name,
  description: attraction.city,
  coordinate: {
    latitude: attraction.location.latitude,
    longitude: attraction.location.longitude,
  },
})
