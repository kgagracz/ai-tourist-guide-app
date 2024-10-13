import { useQuery } from '@tanstack/react-query'
import { getAttractionIntro } from '../attractions/getAttractionIntro'

export const useGetAttractionIntro = (attractionName: string, enabled: boolean) => {
  console.log('useGetAttractionIntro', attractionName, enabled)
  const query = useQuery({
    queryFn: () => getAttractionIntro(attractionName),
    queryKey: [getAttractionIntro, attractionName],
    select: (data) => data.data.message,
    enabled,
  })
  return query
}
