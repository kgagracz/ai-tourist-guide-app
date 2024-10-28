import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GestureResponderEvent } from 'react-native'
import { GET_ATTRACTION_BY_NAME } from '../queryKeys'
import { getAttractionsByName, parseResponseToAttractions } from '../services/getAttractionsByName'
import { Attraction } from '../../../models/Attraction'
import { useMapContext } from '../../../context/Map/MapContext'
import { parseAttractionToMarker } from '../../../services/marker'
import { parseAttractionLocationToRegion } from '../../../components/organisms/Map/Map.util'

const validatePhrase = (phrase?: string) => !!(phrase && phrase?.length > 3)

// todo - to reduce request time: first narrow search area, then expand it for example:
//  first request searching in country, then worldwide
export const useGetAttractionsByName = (phrase: string) => {
  const abortController = useMemo(() => new AbortController(), [])
  const navigation = useNavigation()
  const { addMarker, moveMapToRegion } = useMapContext()

  const onAttractionPress = useCallback((e: GestureResponderEvent, attraction: Attraction) => {
    navigation.navigate('Home')
    addMarker(parseAttractionToMarker(attraction))
    moveMapToRegion(parseAttractionLocationToRegion(attraction.location))
  }, [])

  const query = useQuery({
    queryKey: [GET_ATTRACTION_BY_NAME, phrase],
    queryFn: () => getAttractionsByName(phrase, abortController.signal),
    enabled: validatePhrase(phrase),
    select: (data) => parseResponseToAttractions(data, onAttractionPress),
  })

  useEffect(() => () => {
    // abortController.abort()
  }, [phrase, abortController])

  return query
}
