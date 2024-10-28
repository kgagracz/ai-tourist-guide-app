import { useQuery } from '@tanstack/react-query'
import { GET_ATTRACTIONS_BY_CITY } from '../queryKeys'
import { getAttractionsByCity } from '../services/getAttractionsByCity'
import { parseOverpassResponse } from '../services/utils'

export const useGetAttractionsByCity = (city: string) => {
  const query = useQuery({
    queryKey: [GET_ATTRACTIONS_BY_CITY],
    queryFn: ({ signal }) => getAttractionsByCity(city, signal),
    select: parseOverpassResponse,
  })

  const { isSuccess } = query

  return query
}
