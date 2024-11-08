import { useQuery } from '@tanstack/react-query'
import { getAttractionIntro } from '../services/getAttractionIntro'
import { GET_ATTRACTION_INTRO } from '../../queryKeys'
import { QueryHookOptionsModel } from '../../../models/QueryHookOptionsModel'

interface GetAttractionIntroOptions extends QueryHookOptionsModel<any, any> {
  attractionName: string
}

export const useGetAttractionIntroQuery = (options: GetAttractionIntroOptions) => {
  const {
    enabled,
    attractionName,
    select,
  } = options

  return useQuery({
    queryFn: () => getAttractionIntro(attractionName),
    queryKey: [GET_ATTRACTION_INTRO, attractionName],
    select,
    enabled,
  })
}
