import { useQuery } from '@tanstack/react-query'
import { GET_VISITED_ATTRACTIONS } from '../queryKeys'
import { getVisitedAttractions } from '../services/visitedAttractionsService'
import { QueryHookOptionsModel } from '../../../models/QueryHookOptionsModel'

interface UseGetVisitedAttractionsOptions extends QueryHookOptionsModel<any, any> {}

export const useGetVisitedAttractionsQuery = (options: UseGetVisitedAttractionsOptions) => {
  const { select } = options

  return useQuery({
    queryFn: getVisitedAttractions,
    queryKey: [GET_VISITED_ATTRACTIONS],
    select,
  })
}
