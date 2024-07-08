import { Attraction } from '../models/Attraction'
import savedAttractionsMock from '../mocks/savedAttractions.json'

export const getSavedAttractions = async (): Promise<Attraction[] | undefined> => {
  const res = new Promise((resolve) => {
    setTimeout(() => {
      resolve(savedAttractionsMock)
    }, 300)
  })
  return res as Promise<Attraction[]>
}
