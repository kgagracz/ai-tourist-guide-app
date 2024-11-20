import axios from 'axios/index'
import { OVERPASS_API_URL } from '../../../env.development.local'
import { OverpassResponse } from '../models/OverpassResponse'

const prepareOverpassQuery = (city: string) => `[out:json][timeout:26];area[name~"${city}"]->.searchArea;nwr["tourism"="attraction"](area.searchArea);out geom;`

export const getAttractionsByCity = async (city: string, signal: AbortSignal) => {
  const qry = encodeURIComponent(prepareOverpassQuery(city))
  const overpassApiUrl = `${OVERPASS_API_URL}/interpreter`
  const body = `data=${qry}`
  return axios.post<OverpassResponse>(overpassApiUrl, body, { signal })
}
