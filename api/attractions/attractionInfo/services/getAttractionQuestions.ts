import { ATTRACTION_API_URL } from '@env'
import axios from 'axios'
import { ApiResponse } from '../../../models/ApiResponse'

export const getAttractionQuestions = async (overpassId?: number) => axios.get<ApiResponse<string[]>>(`${ATTRACTION_API_URL}/attraction/${overpassId}/questions`)
