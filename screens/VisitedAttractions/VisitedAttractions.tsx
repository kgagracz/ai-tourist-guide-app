import { View } from 'react-native'
import { NormalText } from '../../components/atoms/NormalText'
import { AttractionList } from '../../components/organisms/AttractionsList/AttractionList'
import { useGetVisitedAttractions } from '../../api/attractions/visitedAttractions/hooks/useGetVisitedAttractions'

export const VisitedAttractions = () => {
  const { data: visitedAttractions, isLoading } = useGetVisitedAttractions()

  return (
    <View>
      {isLoading && <NormalText>Ładowanie...</NormalText>}
      {visitedAttractions && !isLoading && <AttractionList attractions={visitedAttractions} />}
    </View>
  )
}
