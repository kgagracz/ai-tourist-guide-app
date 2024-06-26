import { StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { SavedAttraction } from '../../../models/SavedAttraction'
import { NormalText } from '../../atoms/NormalText'
import { BoldText } from '../../atoms/BoldText'
import { Button } from '../../atoms/Button'
import { useMapContext } from '../../../context/MapContext'
import { parseLocationToRegion } from '../Map/Map.util'

type SavedAttractionListItemProps = {
    attraction: SavedAttraction
}

export const SavedAttractionListItem = ({ attraction }: SavedAttractionListItemProps) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { location, name, city } = attraction
  const { setMapRegion } = useMapContext()

  const onGoToAttractionButtonClick = () => {
    navigation.navigate(t('menuMap'))
    // @ts-ignore
    const region = parseLocationToRegion({
      coords: { latitude: location.latitude, longitude: location.longitude },
    })
    console.log(region)
    setMapRegion(region)
  }

  return (
    <View style={styles.container}>
      <View>
        <BoldText>{name}</BoldText>
        <NormalText>{city}</NormalText>
      </View>
      <View style={styles.iconsBox}>
        <Icon name="close" size={36} />
        <Icon name="close" size={36} />
        <Button onPress={onGoToAttractionButtonClick} icon={<Icon name="chevron-right" size={36} />} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
