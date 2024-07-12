import allAttractionsMock from '../mocks/allAttractions.json'

export const getAttraction = async (attractionId: number | null) => allAttractionsMock.find(
  ({ id }) => id === attractionId,
) ?? null
export const getAllAttractions = async () => allAttractionsMock
