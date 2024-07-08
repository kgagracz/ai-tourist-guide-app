import { Attraction } from '../models/Attraction'
import { get, post } from '../services/communication'

export const VISITED_ATTRACTION_API_URL = '/visited'

export const getVisitedAttractions = async (): Promise<Attraction[] | undefined> => {
  const res = await get(VISITED_ATTRACTION_API_URL)
  return res ? JSON.parse(res) as Promise<Attraction[]> : []
}

export const addToVisitedAttractions = async (attraction: Attraction) => {
  await post(VISITED_ATTRACTION_API_URL, attraction)
}
