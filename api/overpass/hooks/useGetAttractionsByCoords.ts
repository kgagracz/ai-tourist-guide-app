import { useQuery } from '@tanstack/react-query'
import { Region } from 'react-native-maps'
import { getAttractionsByRegion } from '../services/getAttractionsByRegion'
import { GET_ATTRACTIONS_BY_COORDS } from '../queryKeys'
import { parseOverpassResponse } from '../services/utils'
import { mapDelta } from '../../../components/organisms/Map/Map.Const'

export const useGetAttractionsByCoords = () => {
  const region: Region = {
    longitude: 1,
    latitude: 1,
    longitudeDelta: mapDelta,
    latitudeDelta: mapDelta,
  }

  return useQuery({
    queryFn: ({ signal }) => getAttractionsByRegion(region, signal),
    queryKey: [GET_ATTRACTIONS_BY_COORDS],
    select: parseOverpassResponse,
  })
}
