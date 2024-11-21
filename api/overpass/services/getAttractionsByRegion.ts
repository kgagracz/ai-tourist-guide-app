import axios from 'axios'
import { Region } from 'react-native-maps'
import { OVERPASS_API_URL } from '@env'
import { getBoundByRegion } from '../../../services/mapUtils'
import { OverpassResponse } from '../models/OverpassResponse'

const prepareOverpassQuery = (coords: Region) => {
  const coordsBoundary = getBoundByRegion(coords).join(',')
  return `[out:json][timeout:26];nwr["tourism"="attraction"](${coordsBoundary});out geom;`
}

export const getAttractionsByRegion = async (region: Region | null) => {
  if (!region) throw new Error('No region defined')

  const qry = encodeURIComponent(prepareOverpassQuery(region))
  const overpassApiUrl = `${OVERPASS_API_URL}/interpreter`
  const body = `data=${qry}`

  return axios.post<OverpassResponse>(overpassApiUrl, body)
}
