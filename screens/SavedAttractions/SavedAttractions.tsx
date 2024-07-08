import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Icon from '@expo/vector-icons/MaterialIcons'
import { getSavedAttractions } from '../../api/savedAttractions.api'
import { AttractionList } from '../../components/organisms/AttractionsList/AttractionList'
import { NormalText } from '../../components/atoms/NormalText'
import { parseLocationToRegion } from '../../components/organisms/Map/Map.util'
import { Marker } from '../../models/Marker'
import { useMapContext } from '../../context/Map/MapContext'
import { Attraction } from '../../models/Attraction'

export const SavedAttractions = () => {
  const { data: savedAttractions, isLoading } = useQuery({
    queryKey: ['savedAttractions'],
    queryFn: getSavedAttractions,
  })
  const navigation = useNavigation()
  const { addMarker, setMapRegion } = useMapContext()
  const { t } = useTranslation()

  const onGoToAttractionButtonClick = (attraction: Attraction) => {
    const {
      location,
      name,
      city,
    } = attraction
    const { latitude, longitude } = location
    navigation.navigate(t('menuMap'))
    const region = parseLocationToRegion({
      // @ts-ignore
      coords: { latitude, longitude },
    })
    const marker: Marker = {
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

  const onMarkVisitedButtonClick = (attraction: Attraction) => {
    console.log(attraction)
  }

  const onRemoveFromSavedButtonClick = (attraction: Attraction) => {
    console.log(attraction)
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
