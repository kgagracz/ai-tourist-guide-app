import axios from 'axios'
import { Region } from 'react-native-maps'
import { Attraction } from '../../models/Attraction'
import { filterAttractions } from './utils'
import { getBoundByRegion } from '../../services/mapUtils'
import { OVERPASS_API_URL } from '../../env.development'

const prepareOverpassQuery = (coords: Region) => {
  const coordsBoundary = getBoundByRegion(coords).join(',')
  return `[out:json][timeout:26];nwr["tourism"="attraction"](${coordsBoundary});out geom;`
}

export const getAttractionsByRegion = async (region: Region, signal: AbortSignal) => {
  const qry = encodeURIComponent(prepareOverpassQuery(region))
  const overpassApiUrl = `${OVERPASS_API_URL}/interpreter`
  const body = `data=${qry}`
  return axios.post(overpassApiUrl, body, { signal })
    .then((response) => {
      console.log('pobieranie zakończone')
      const res = response.data.elements.filter(filterAttractions).map((attraction) => ({
        id: attraction.id,
        name: attraction.tags.name,
        location: {
          longitude: attraction.lon,
          latitude: attraction.lat,
        },
      })) as Attraction[]
      return res
    })
    .catch((error) => {
      console.log('error', error)
    })
}
