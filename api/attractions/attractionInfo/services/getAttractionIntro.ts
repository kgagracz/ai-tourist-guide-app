import axios from 'axios'
import { ATTRACTION_API_URL } from '@env'
import { AttractionDetailsResponse } from '../models/AttractionDetailsResponse'

export const getAttractionIntro = async (overpassId: number) => axios.get<AttractionDetailsResponse>(
  `${ATTRACTION_API_URL}/attraction/${overpassId}`,
)
