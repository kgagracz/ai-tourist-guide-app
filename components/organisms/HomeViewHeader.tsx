import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Theme, useNavigation, useTheme } from '@react-navigation/native'
import { Input } from 'react-native-elements'
import { useMapSearchContext } from '../../context/MapSearchContext'

export const HomeViewHeader = (props) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const theme = useTheme()
  const styles = makeStyles(theme)
  const { setPhrase } = useMapSearchContext()

  const onSearchInputChange = (value: string) => setPhrase(value)
  const onSearchInputPress = () => navigation.navigate('MapSearch')

  return (
    <View style={styles.container}>
      {/* <Heading>{t('menuMap')}</Heading> */}
      <Input
        style={styles.searchInput}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        onChangeText={onSearchInputChange}
        onPress={onSearchInputPress}
        underlineColorAndroid="transparent"
        placeholder="Znajdź atrakcję..."
      />
      {/* <Button icon={<Icon size={45} name="search" />} onPress={onSearchPress} /> */}
    </View>
  )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  searchContainer: {
    padding: 20,
  },
  searchInputContainer: {
    borderBottomWidth: 0,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    borderBottomWidth: 0,
  },
})
