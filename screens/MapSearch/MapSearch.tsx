import { StyleSheet, View } from 'react-native'
import { useMapSearchContext } from '../../context/MapSearchContext'
import { useGetAttractionsByName } from '../../api/hooks/useGetAttractionsByName'
import { AttractionList } from '../../components/organisms/AttractionsList/AttractionList'
import Loader from '../../components/atoms/Loader'
import { NormalText } from '../../components/atoms/NormalText'

export const MapSearch = () => {
  const styles = makeStyles()
  const { phrase } = useMapSearchContext()
  const { data, isLoading, isSuccess } = useGetAttractionsByName(phrase)
  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <AttractionList attractions={data || []} />
      {isSuccess && data.length === 0 && <NormalText>Nie znaleziono żadnych atrakcji turystycznych</NormalText>}
    </View>
  )
}

const makeStyles = () => StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
  },
})
