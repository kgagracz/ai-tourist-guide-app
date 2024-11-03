import axios from 'axios'
import { SaveAttractionBody } from '../models/saveAttractionModel'
import { ATTRACTION_API_URL } from '../../../../env.development'

export const saveAttraction = (attraction: SaveAttractionBody) => axios.post(
  `${ATTRACTION_API_URL}/saved-attractions`,
  attraction,
)
