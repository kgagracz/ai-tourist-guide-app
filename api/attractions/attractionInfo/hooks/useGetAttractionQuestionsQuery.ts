import { useQuery } from '@tanstack/react-query'
import { getAttractionQuestions } from '../services/getAttractionQuestions'
import { GET_ATTRACTION_QUESTIONS } from '../../queryKeys'

export const useGetAttractionQuestionsQuery = (overpassId?: number) => useQuery({
  queryFn: () => getAttractionQuestions(overpassId),
  queryKey: [GET_ATTRACTION_QUESTIONS],
  enabled: !!overpassId,
  staleTime: Infinity,
})
