import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getSavedAttractions } from '../../api/savedAttractions.api'
import { SavedAttractionList } from '../../components/organisms/SavedAttractionsList/SavedAttractionList'
import { NormalText } from '../../components/atoms/NormalText'

export const SavedAttractions = () => {
  const { data: savedAttractions, isLoading } = useQuery({
    queryKey: ['savedAttractions'],
    queryFn: getSavedAttractions,
  })

  return (
    <View>
      {isLoading && <NormalText>Ładowanie...</NormalText>}
      {savedAttractions && !isLoading && <SavedAttractionList savedAttractions={savedAttractions} />}
    </View>
  )
}
