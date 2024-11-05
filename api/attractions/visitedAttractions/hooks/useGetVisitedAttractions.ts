import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { GestureResponderEvent } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GET_VISITED_ATTRACTIONS } from '../queryKeys'
import { parseResponseToAttractions } from '../../../overpass/services/getAttractionsByName'
import { Attraction } from '../../../../models/Attraction'
import { parseAttractionToMarker } from '../../../../services/marker'
import { parseAttractionLocationToRegion } from '../../../../components/organisms/Map/Map.util'
import { useMapContext } from '../../../../context/Map/MapContext'
import { getVisitedAttractions } from '../services/visitedAttractionsService'

export const useGetVisitedAttractions = () => {
  const navigation = useNavigation()
  const { addMarker, moveMapToRegion } = useMapContext()

  const onAttractionPress = useCallback((e: GestureResponderEvent, attraction: Attraction) => {
    navigation.navigate('Home')
    addMarker(parseAttractionToMarker(attraction))
    moveMapToRegion(parseAttractionLocationToRegion(attraction.location))
  }, [])

  const query = useQuery({
    queryFn: getVisitedAttractions,
    queryKey: [GET_VISITED_ATTRACTIONS],
    select: (data) => parseResponseToAttractions(data.data.data, onAttractionPress),
  })

  return query
}
