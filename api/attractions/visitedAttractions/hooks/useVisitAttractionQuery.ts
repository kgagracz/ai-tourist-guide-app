import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { visitAttraction } from '../services/visitedAttractionsService'
import { VISIT_ATTRACTION } from '../queryKeys'
import { SaveAttractionBody } from '../../savedAttractions/models/saveAttractionModel'
import { MutationHookOptionsModel } from '../../../models/MutationHookOptionsModel'

interface UseSaveAttractionOptions extends MutationHookOptionsModel {}

export const useVisitAttractionQuery = (options: UseSaveAttractionOptions = {}) => {
  const { onSuccess, onError } = options

  return useMutation<unknown, AxiosError, SaveAttractionBody, unknown>({
    mutationFn: visitAttraction,
    mutationKey: [VISIT_ATTRACTION],
    onSuccess,
    onError,
  })
}
