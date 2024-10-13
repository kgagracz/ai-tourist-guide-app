import { useQuery } from '@tanstack/react-query'
import { GET_ATTRACTIONS_BY_CITY } from '../queryKeys'
import { getAttractionsByCity } from '../overpass/getAttractionsByCity'

export const useGetAttractionsByCity = (city: string) => {
  const query = useQuery({
    queryKey: [GET_ATTRACTIONS_BY_CITY],
    queryFn: ({ signal }) => getAttractionsByCity(city, signal),
  })

  const { isSuccess } = query

  return query
}
