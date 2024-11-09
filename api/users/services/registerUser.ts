import axios from 'axios'
import { ATTRACTION_API_URL } from '../../../env.development'
import { RegisterUserBodyModel } from '../models/registerUserBodyModel'

export const registerUser = (userBody: RegisterUserBodyModel) => axios.post(`${ATTRACTION_API_URL}/users`, userBody)
