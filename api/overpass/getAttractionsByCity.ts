import axios from 'axios/index'
import { Attraction } from '../../models/Attraction'
import { filterAttractions } from './utils'
import { OVERPASS_API_URL } from '../../env.development'

const prepareOverpassQuery = (city: string) => `[out:json][timeout:26];area[name~"${city}"]->.searchArea;nwr["tourism"="attraction"](area.searchArea);out geom;`

export const getAttractionsByCity = async (city: string, signal: AbortSignal) => {
  const qry = encodeURIComponent(prepareOverpassQuery(city))
  const overpassApiUrl = `${OVERPASS_API_URL}/interpreter`
  const body = `data=${qry}`
  return axios.post(overpassApiUrl, body, { signal })
    .then((response) => response.data.elements.filter(filterAttractions).map((attraction) => ({
      id: attraction.id,
      name: attraction.tags.name,
      city: attraction.tags['addr:city'],
      location: {
        longitude: attraction.lon,
        latitude: attraction.lat,
      },
    })) as Attraction[])
    .catch((error) => {
      console.log('error', error)
    })
}
