import { useQuery } from '@tanstack/react-query'
import { getAttractionsByRegion } from '../overpass/getAttractionsByRegion'
import { GET_ATTRACTIONS_BY_COORDS } from '../queryKeys'

export const useGetAttractionsByCoords = () => useQuery({
  queryFn: () => getAttractionsByRegion({ lon: 1, lat: 1 }),
  queryKey: [GET_ATTRACTIONS_BY_COORDS],
})
