import axios from 'axios'
import { VisitAttractionBody } from '../models/visitAttractionModel'
import { ATTRACTION_API_URL } from '../../../../env.development.local'
import { ApiResponse } from '../../../models/ApiResponse'
import { OverpassResponse } from '../../../overpass/models/OverpassResponse'

export const visitAttraction = (attraction: VisitAttractionBody) => axios.post(
  `${ATTRACTION_API_URL}/visited-attractions`,
  attraction,
)

export const getVisitedAttractions = () => axios.get<ApiResponse<OverpassResponse>>(`${ATTRACTION_API_URL}/visited-attractions`)
