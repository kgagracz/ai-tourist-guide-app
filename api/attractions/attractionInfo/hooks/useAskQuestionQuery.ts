import { useMutation } from '@tanstack/react-query'
import { GET_ATTRACTION_QUESTION_ANSWER } from '../../queryKeys'
import { getQuestionAnswer } from '../services/getQuestionAnswer'
import { MutationHookOptionsModel } from '../../../models/MutationHookOptionsModel'

interface GetAttractionIntroOptions extends MutationHookOptionsModel<any, any> {
}

export const useGetAttractionIntroQuery = (options: GetAttractionIntroOptions) => useMutation({
  mutationFn: (question: string) => getQuestionAnswer(question),
  mutationKey: [GET_ATTRACTION_QUESTION_ANSWER],
  onError: options.onError,
  onSuccess: options.onSuccess,
})
