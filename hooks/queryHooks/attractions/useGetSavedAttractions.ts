import { useCallback } from 'react'
import { GestureResponderEvent } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useGetSavedAttractionsQuery } from '../../../api/attractions/savedAttractions/hooks/useGetSavedAttractionsQuery'
import { useMapContext } from '../../../context/Map/MapContext'
import { Attraction } from '../../../models/Attraction'
import { parseAttractionToMarker } from '../../../services/marker'
import { parseAttractionLocationToRegion } from '../../../components/organisms/Map/Map.util'
import { parseResponseToAttractions } from '../../../api/overpass/services/getAttractionsByName'

export const useGetSavedAttractions = () => {
  const navigation = useNavigation()
  const { addMarker, moveMapToRegion } = useMapContext()

  const onAttractionPress = useCallback((e: GestureResponderEvent, attraction: Attraction) => {
    navigation.navigate('Home')
    addMarker(parseAttractionToMarker(attraction))
    moveMapToRegion(parseAttractionLocationToRegion(attraction.location))
  }, [addMarker, moveMapToRegion, navigation])

  return useGetSavedAttractionsQuery({
    select: (data) => parseResponseToAttractions(data.data.data, onAttractionPress),
  })
}
