import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { GET_ATTRACTION_QUESTION_ANSWER } from '../../queryKeys'
import { getQuestionAnswer } from '../services/getQuestionAnswer'
import { MutationHookOptionsModel } from '../../../models/MutationHookOptionsModel'
import { QuestionAnswerRequest } from '../models/QuestionAnswerRequest'
import { ApiResponse } from '../../../models/ApiResponse'
import { Answer } from '../../../../models/Answer'

type AttractionQuestionAnswerResponse = AxiosResponse<ApiResponse<Answer>>

export interface GetAttractionIntroOptions
extends MutationHookOptionsModel<AttractionQuestionAnswerResponse, unknown, QuestionAnswerRequest> {
}

export const useGetAttractionIntroQuery = (
  options: GetAttractionIntroOptions,
) => useMutation<AttractionQuestionAnswerResponse, unknown, QuestionAnswerRequest>({
  mutationFn: (args: QuestionAnswerRequest) => getQuestionAnswer(args),
  mutationKey: [GET_ATTRACTION_QUESTION_ANSWER],
  onError: options.onError,
  onSuccess: options.onSuccess,
})
