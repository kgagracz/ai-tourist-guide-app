import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { getAttractionQuestions } from '../services/getAttractionQuestions'
import { GET_ATTRACTION_QUESTIONS } from '../../queryKeys'
import { QueryHookOptionsModel } from '../../../models/QueryHookOptionsModel'
import { ApiResponse } from '../../../models/ApiResponse'

type QuestionsResponse = AxiosResponse<ApiResponse<string[]>>

interface UseGetAttractionQuestionsQueryOptions<TData = void, TResultData = void>
extends QueryHookOptionsModel<TData, TResultData> {
  overpassId?: number
}

export const useGetAttractionQuestionsQuery = <TResultData = QuestionsResponse>({
  overpassId,
  enabled,
  select,
}: UseGetAttractionQuestionsQueryOptions<QuestionsResponse, TResultData>) => useQuery<QuestionsResponse, unknown, TResultData>({
  queryFn: () => getAttractionQuestions(overpassId),
  queryKey: [GET_ATTRACTION_QUESTIONS],
  enabled: !!overpassId && enabled,
  staleTime: Infinity,
  select,
})
