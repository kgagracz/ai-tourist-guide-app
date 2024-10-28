import { useMutation } from '@tanstack/react-query'
import { Region } from 'react-native-maps'
import { AxiosResponse } from 'axios'
import { getAttractionsByRegion } from '../services/getAttractionsByRegion'
import { GET_ATTRACTIONS_BY_COORDS } from '../queryKeys'
import { OverpassResponse } from '../models/OverpassResponse'
import { parseAttractionsToMarkers } from '../../../services/marker'
import { parseOverpassResponse } from '../services/utils'

export const useGetMarkersByCoords = (
  onSuccess?: (data: AxiosResponse<OverpassResponse>) => void,
) => {
  const query = useMutation({
    mutationFn: (region: Region) => getAttractionsByRegion(region),
    mutationKey: [GET_ATTRACTIONS_BY_COORDS],
    onSuccess,
  })

  return {
    ...query,
    data: parseAttractionsToMarkers(parseOverpassResponse(query?.data)),
  }
}
