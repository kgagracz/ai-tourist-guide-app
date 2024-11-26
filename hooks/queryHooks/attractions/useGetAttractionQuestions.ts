import {
  useGetAttractionQuestionsQuery,
} from '../../../api/attractions/attractionInfo/hooks/useGetAttractionQuestionsQuery'

export const useGetAttractionQuestions = (overpassId?: number) => {
  const query = useGetAttractionQuestionsQuery(overpassId)
  return query
}
