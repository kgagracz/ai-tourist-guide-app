import { useMutation } from '@tanstack/react-query'
import { visitAttraction } from '../services/visitedAttractionsService'
import { VISIT_ATTRACTION } from '../queryKeys'
import { MutationCallbacksModel } from '../../../models/QueryCallbacksModel'

interface UseSaveAttractionOptions extends MutationCallbacksModel {

}

export const useVisitAttraction = (options: UseSaveAttractionOptions) => {
  const { onSuccess, onError } = options

  return useMutation({
    mutationFn: visitAttraction,
    mutationKey: [VISIT_ATTRACTION],
    onSuccess,
    onError,
  })
}
