import { useQuery } from '@tanstack/react-query'
import { getAttractionIntro } from '../attractions/getAttractionIntro'

export const useGetAttractionIntro = (attractionName: string, enabled: boolean) => useQuery({
  queryFn: () => getAttractionIntro(attractionName),
  queryKey: [getAttractionIntro, attractionName],
  select: (data) => data.data.message,
  enabled,
})
