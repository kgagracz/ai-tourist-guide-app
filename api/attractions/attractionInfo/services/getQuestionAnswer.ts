import axios from 'axios'
import { ATTRACTION_API_URL } from '@env'
import { QuestionAnswerRequest } from '../models/QuestionAnswerRequest'

export const getQuestionAnswer = async (body: QuestionAnswerRequest) => axios.post(`${ATTRACTION_API_URL}/attraction/ask`, body)
