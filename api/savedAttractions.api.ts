import { Attraction } from '../models/Attraction'
import { saveToAsyncStorage } from '../services/asyncStorage'
import { get } from '../services/communication'

export const SAVED_ATTRACTIONS_API_URL = '/saved'

export const getSavedAttractions = async (): Promise<Attraction[]> => {
  const res = await get(SAVED_ATTRACTIONS_API_URL)
  return res ? JSON.parse(res) as Promise<Attraction[]> : []
}

export const removeFromSavedAttractions = async (attractionId: number) => {
  const allAttractions = await getSavedAttractions()
  if (!allAttractions) { return }
  const newAttractions = allAttractions.filter((attraction) => attraction.id !== attractionId)
  await saveToAsyncStorage(SAVED_ATTRACTIONS_API_URL, newAttractions)
}
