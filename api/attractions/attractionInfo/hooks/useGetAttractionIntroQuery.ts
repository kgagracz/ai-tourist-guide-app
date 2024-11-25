import { useQuery } from '@tanstack/react-query'
import { getAttractionIntro } from '../services/getAttractionIntro'
import { GET_ATTRACTION_INTRO } from '../../queryKeys'
import { QueryHookOptionsModel } from '../../../models/QueryHookOptionsModel'

interface GetAttractionIntroOptions extends QueryHookOptionsModel<any, any> {
  attractionOverpassId: number
}

export const useGetAttractionIntroQuery = (options: GetAttractionIntroOptions) => {
  const {
    enabled,
    attractionOverpassId,
    select,
  } = options

  return useQuery({
    queryFn: () => getAttractionIntro(attractionOverpassId),
    queryKey: [GET_ATTRACTION_INTRO, attractionOverpassId],
    select,
    enabled,
  })
}
