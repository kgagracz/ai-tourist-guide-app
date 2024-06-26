import { View, ViewStyle } from 'react-native'
import { SavedAttraction } from '../../../models/SavedAttraction'
import { NormalText } from '../../atoms/NormalText'
import { BoldText } from '../../atoms/BoldText'

type SavedAttractionListItemProps = {
    attraction: SavedAttraction
}

export const SavedAttractionListItem = ({ attraction }: SavedAttractionListItemProps) => {
  const { location, name, city } = attraction

  return (
    <View style={styles.container as ViewStyle}>
      <BoldText>{name}</BoldText>
      <NormalText>{city}</NormalText>
    </View>
  )
}

const styles = {
  container: {
    borderBottomWidth: 1,
    padding: 10,
  },
}
