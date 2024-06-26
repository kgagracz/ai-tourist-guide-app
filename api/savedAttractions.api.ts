import { SavedAttraction } from '../models/SavedAttraction'
import savedAttractionsMock from '../mocks/savedAttractions.json'

export const getSavedAttractions = async (): Promise<SavedAttraction[] | undefined> => {
  const res = new Promise((resolve) => {
    setTimeout(() => {
      resolve(savedAttractionsMock)
    }, 300)
  })
  return res as Promise<SavedAttraction[]>
}
