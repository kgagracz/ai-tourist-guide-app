import axios from 'axios'
import { ATTRACTION_API_URL } from '@env'
import { prepareQueryParamsFromObject } from '../../../../services/communication'

export const getAttractionIntro = async (touristFacility: string) => {
  const params = prepareQueryParamsFromObject({ touristFacility })
  return axios.get(
    `${ATTRACTION_API_URL}/attraction/intro?${params}`,
  )
}
