import { useCallback } from 'react'
import { GestureResponderEvent } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Attraction } from '../../../models/Attraction'
import { parseAttractionToMarker } from '../../../services/marker'
import { parseAttractionLocationToRegion } from '../../../components/organisms/Map/Map.util'
import { useMapContext } from '../../../context/Map/MapContext'
import {
  useGetVisitedAttractionsQuery,
} from '../../../api/attractions/visitedAttractions/hooks/useGetVisitedAttractionsQuery'
import { parseResponseToAttractions } from '../../../api/overpass/services/getAttractionsByName'

export const useGetVisitedAttractions = () => {
  const navigation = useNavigation()
  const { addMarker, moveMapToRegion } = useMapContext()

  const onAttractionPress = useCallback((e: GestureResponderEvent, attraction: Attraction) => {
    // @ts-ignore
    navigation.navigate('Home')
    addMarker(parseAttractionToMarker(attraction))
    moveMapToRegion(parseAttractionLocationToRegion(attraction.location))
  }, [navigation, addMarker, moveMapToRegion])

  return useGetVisitedAttractionsQuery({
    select: (data) => parseResponseToAttractions(data.data.data, onAttractionPress),
  })
}
