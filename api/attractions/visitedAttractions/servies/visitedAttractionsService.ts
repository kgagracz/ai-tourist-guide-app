import axios from 'axios'
import { VisitAttractionBody } from '../models/visitAttractionModel'
import { ATTRACTION_API_URL } from '../../../../env.development'

export const visitAttraction = (attraction: VisitAttractionBody) => axios.post(
  `${ATTRACTION_API_URL}/visited-attractions`,
  attraction,
)
