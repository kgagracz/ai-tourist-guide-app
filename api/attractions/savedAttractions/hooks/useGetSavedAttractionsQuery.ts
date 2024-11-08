import { useQuery } from '@tanstack/react-query'
import { getSavedAttractions } from '../services/savedAttractionsService'
import { GET_SAVED_ATTRACTIONS } from '../queryKeys'
import { QueryHookOptionsModel } from '../../../models/QueryHookOptionsModel'

interface UseGetSavedAttractionsQueryOptions extends QueryHookOptionsModel<any, any>{}

export const useGetSavedAttractionsQuery = (options: UseGetSavedAttractionsQueryOptions) => {
  const { enabled, select } = options

  return useQuery({
    queryFn: getSavedAttractions,
    queryKey: [GET_SAVED_ATTRACTIONS],
    select,
    enabled,
  })
}
