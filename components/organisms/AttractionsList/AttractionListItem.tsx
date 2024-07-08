import { StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { NormalText } from '../../atoms/NormalText'
import { BoldText } from '../../atoms/BoldText'
import { Button } from '../../atoms/Button'
import { AttractionAction } from './AttractionList.Model'
import { Attraction } from '../../../models/Attraction'
import { ThemeType } from '../SchemeContext/SchemeProvider'

type SavedAttractionListItemProps = {
  attraction: Attraction
  attractionMainAction?: AttractionAction
  attractionSubActions?: AttractionAction[]
}

export const AttractionListItem = ({
  attraction,
  attractionSubActions,
  attractionMainAction,
}: SavedAttractionListItemProps) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const {
    name,
    city,
  } = attraction

  return (
    <View style={styles.container}>
      <View>
        <BoldText style={styles.itemName}>{name}</BoldText>
        <NormalText>{city}</NormalText>
      </View>
      <View style={styles.iconsBox}>
        {attractionSubActions?.map((action) => (
          <Button
            onPress={() => action.onPress?.(attraction)}
            icon={action.icon}
            style={{ backgroundColor: 'red' }}
            type="clear"
          />
        ))}
        {attractionMainAction && (
        <Button
          onPress={() => attractionMainAction.onPress?.(attraction)}
          icon={attractionMainAction.icon ?? <Icon name="chevron-right" size={36} />}
        />
        )}
      </View>
    </View>
  )
}

const makeStyles = (color: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: color.backgroundColor,
    borderBottomWidth: 1,
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    color: color.text,
  },
  iconsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
