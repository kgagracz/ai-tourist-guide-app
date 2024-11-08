import { useMutation } from '@tanstack/react-query'
import { Attraction } from '../../../../models/Attraction'
import { removeAttractionFromSaved } from '../services/savedAttractionsService'
import { REMOVE_ATTRACTION_FROM_SAVED } from '../queryKeys'
import { MutationHookOptionsModel } from '../../../models/MutationHookOptionsModel'

export const useRemoveAttractionFromSavedQuery = (options: MutationHookOptionsModel = {}) => {
  const { onSuccess, onError } = options

  return useMutation({
    mutationFn: (attractionId: Attraction['id']) => removeAttractionFromSaved(attractionId),
    mutationKey: [REMOVE_ATTRACTION_FROM_SAVED],
    onSuccess,
    onError,
  })
}
