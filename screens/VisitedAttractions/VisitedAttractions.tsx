import { View } from 'react-native'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { NormalText } from '../../components/atoms/NormalText'
import { AttractionList } from '../../components/organisms/AttractionsList/AttractionList'
import { getVisitedAttractions } from '../../api/attractions/attractionInfo/services/visitedAttractions.api'

export const VisitedAttractions = () => {
  const queryClient = useQueryClient()
  const { data: visitedAttractions, isLoading } = useQuery({
    queryKey: ['visitedAttractions'],
    queryFn: getVisitedAttractions,
  }, queryClient)

  return (
    <View>
      {isLoading && <NormalText>Ładowanie...</NormalText>}
      {visitedAttractions && !isLoading && <AttractionList attractions={visitedAttractions} />}
    </View>
  )
}
