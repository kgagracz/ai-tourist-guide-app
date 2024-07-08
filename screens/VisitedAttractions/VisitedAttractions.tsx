import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { NormalText } from '../../components/atoms/NormalText'
import { AttractionList } from '../../components/organisms/AttractionsList/AttractionList'
import { getVisitedAttractions } from '../../api/visitedAttractions.api'

export const VisitedAttractions = () => {
  const { data: visitedAttractions, isLoading } = useQuery({
    queryKey: ['visitedAttractions'],
    queryFn: getVisitedAttractions,
  })

  return (
    <View>
      {isLoading && <NormalText>Ładowanie...</NormalText>}
      {visitedAttractions && !isLoading && <AttractionList attractions={visitedAttractions} />}
    </View>
  )
}
