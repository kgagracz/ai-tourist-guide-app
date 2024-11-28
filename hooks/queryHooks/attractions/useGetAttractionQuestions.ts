import {
  useGetAttractionQuestionsQuery,
} from '../../../api/attractions/attractionInfo/hooks/useGetAttractionQuestionsQuery'

export const useGetAttractionQuestions = (overpassId?: number) => useGetAttractionQuestionsQuery<string[]>({
  overpassId,
  select: (data) => data.data.data,
})
