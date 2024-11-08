import { View } from 'react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Icon from '@expo/vector-icons/MaterialIcons'
import { AttractionList } from '../../components/organisms/AttractionsList/AttractionList'
import { NormalText } from '../../components/atoms/NormalText'
import { parseLocationToRegion } from '../../components/organisms/Map/Map.util'
import { Marker } from '../../models/Marker'
import { useMapContext } from '../../context/Map/MapContext'
import { Attraction } from '../../models/Attraction'
import { addToVisitedAttractions } from '../../api/attractions/attractionInfo/services/visitedAttractions.api'
import { useGetSavedAttractions } from '../../hooks/queryHooks/attractions/useGetSavedAttractions'
import { useRemoveAttractionFromSaved } from '../../hooks/queryHooks/attractions/useRemoveAttractionFromSaved'
import { useVisitAttraction } from '../../hooks/queryHooks/attractions/useVisitAttraction'

export const SavedAttractions = () => {
  const queryClient = useQueryClient()
  const { data: savedAttractions, isLoading } = useGetSavedAttractions()
  // todo - tutaj coś nie działa invalidateQueries. Po dodaniu do visited nie pobierają się visited.
  const { mutateAsync: addToVisited } = useMutation({
    mutationFn: (attraction: Attraction) => addToVisitedAttractions(attraction),
    onSuccess: async () => queryClient.invalidateQueries({
      queryKey: ['visitedAttractions', 'savedAttractions'],
    }),
  }, queryClient)
  const { mutate: removeAttractionFromSaved } = useRemoveAttractionFromSaved()
  const { mutate: markAttractionVisited } = useVisitAttraction()
  const navigation = useNavigation()
  const { addMarker, setMapRegion } = useMapContext()
  const { t } = useTranslation()

  const onGoToAttractionButtonClick = (attraction: Attraction) => {
    const {
      location,
      name,
      city,
      id,
    } = attraction
    const { latitude, longitude } = location
    navigation.navigate(t('menuMap'))
    const region = parseLocationToRegion({
      // @ts-ignore
      coords: { latitude, longitude },
    })
    const marker: Marker = {
      attractionId: id,
      title: name,
      description: city,
      coordinate: {
        latitude,
        longitude,
      },
    }
    addMarker(marker)
    setMapRegion(region)
  }

  const onMarkVisitedButtonClick = async (attraction: Attraction) => {
    await addToVisited(attraction)
    await markAttractionVisited({ userId: 1, attractionOverpassId: attraction.id })
  }

  const onRemoveFromSavedButtonClick = async (attraction: Attraction) => {
    removeAttractionFromSaved(attraction.id)
  }

  const attractionActions = {
    attractionMainAction: {
      onPress: onGoToAttractionButtonClick,
    },
    attractionSubActions: [
      {
        onPress: onRemoveFromSavedButtonClick,
        icon: <Icon name="delete" size={36} />,
      },
      {
        onPress: onMarkVisitedButtonClick,
        icon: <Icon name="visibility" size={36} />,
      },
    ],
  }

  return (
    <View>
      {isLoading && <NormalText>Ładowanie...</NormalText>}
      {savedAttractions && !isLoading
          && <AttractionList {...attractionActions} attractions={savedAttractions} />}
    </View>
  )
}
