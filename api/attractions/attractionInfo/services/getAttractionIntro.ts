import axios from 'axios'
import { prepareQueryParamsFromObject } from '../../../../services/communication'
import { ATTRACTION_API_URL } from '../../../../env.development.local'

export const getAttractionIntro = async (touristFacility: string) => {
  const params = prepareQueryParamsFromObject({ touristFacility })
  return axios.get(
    `${ATTRACTION_API_URL}/attraction/intro?${params}`,
  )
}
