import axios from 'axios'
import { SaveAttractionBody } from '../models/saveAttractionModel'
import { ATTRACTION_API_URL } from '../../../../env.development'
import { OverpassResponse } from '../../../overpass/models/OverpassResponse'
import { ApiResponse } from '../../../models/ApiResponse'

export const saveAttraction = (attraction: SaveAttractionBody) => axios.post(
  `${ATTRACTION_API_URL}/saved-attractions`,
  attraction,
)

export const getSavedAttractions = () => axios.get<ApiResponse<OverpassResponse>>(`${ATTRACTION_API_URL}/saved-attractions`)
