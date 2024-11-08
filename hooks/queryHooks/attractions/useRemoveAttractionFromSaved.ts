import { QueryClient, useQueryClient } from '@tanstack/react-query'
import {
  useRemoveAttractionFromSavedQuery,
} from '../../../api/attractions/savedAttractions/hooks/useRemoveAttractionFromSavedQuery'
import { GET_SAVED_ATTRACTIONS } from '../../../api/attractions/savedAttractions/queryKeys'

const onSuccess = (queryClient: QueryClient) => queryClient.invalidateQueries({
  queryKey: [GET_SAVED_ATTRACTIONS],
})

export const useRemoveAttractionFromSaved = () => {
  const queryClient = useQueryClient()

  return useRemoveAttractionFromSavedQuery({
    onSuccess: () => onSuccess(queryClient),
  })
}
