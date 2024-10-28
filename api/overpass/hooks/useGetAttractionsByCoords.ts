import { useMutation } from '@tanstack/react-query'
import { Region } from 'react-native-maps'
import { AxiosResponse } from 'axios'
import { getAttractionsByRegion } from '../services/getAttractionsByRegion'
import { GET_ATTRACTIONS_BY_COORDS } from '../queryKeys'
import { parseOverpassResponse } from '../services/utils'
import { OverpassResponse } from '../models/OverpassResponse'

export const useGetAttractionsByCoords = (
  onSuccess?: (data: AxiosResponse<OverpassResponse>) => void,
) => {
  const query = useMutation({
    mutationFn: (region: Region) => getAttractionsByRegion(region),
    mutationKey: [GET_ATTRACTIONS_BY_COORDS],
    onSuccess,
  })

  return {
    ...query,
    data: parseOverpassResponse(query?.data),
  }
}
