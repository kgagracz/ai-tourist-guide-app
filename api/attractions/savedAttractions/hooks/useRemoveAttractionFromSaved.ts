import { useMutation } from '@tanstack/react-query/build/modern'
import { useQueryClient } from '@tanstack/react-query'
import { Attraction } from '../../../../models/Attraction'
import { removeAttractionFromSaved } from '../services/savedAttractionsService'
import { GET_SAVED_ATTRACTIONS, REMOVE_ATTRACTION_FROM_SAVED } from '../queryKeys'

export const useRemoveAttractionFromSaved = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (attractionId: Attraction['id']) => removeAttractionFromSaved(attractionId),
    mutationKey: [REMOVE_ATTRACTION_FROM_SAVED],
    onSuccess: async () => queryClient.invalidateQueries({
      queryKey: [GET_SAVED_ATTRACTIONS],
    }),
  }, queryClient)
}
