import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import AppLoading from 'expo-app-loading'
import { getSavedAttractions } from '../../api/savedAttractions.api'
import { SavedAttractionList } from '../../components/organisms/SavedAttractionsList/SavedAttractionList'

export const SavedAttractions = () => {
  const { data: savedAttractions, isLoading } = useQuery({
    queryKey: ['savedAttractions'],
    queryFn: getSavedAttractions,
  })

  return (
    <View>
      {isLoading && <AppLoading />}
      {savedAttractions && !isLoading && <SavedAttractionList savedAttractions={savedAttractions} />}
    </View>
  )
}
