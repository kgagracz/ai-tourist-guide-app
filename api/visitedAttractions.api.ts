import { Attraction } from '../models/Attraction'
import visitedAttractionsMock from '../mocks/visitedAttractions.json'

export const getVisitedAttractions = async (): Promise<Attraction[] | undefined> => {
  const res = new Promise((resolve) => {
    setTimeout(() => {
      resolve(visitedAttractionsMock)
    }, 300)
  })
  return res as Promise<Attraction[]>
}
