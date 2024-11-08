import { Linking, StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '../atoms/Button'
import { ThemeType } from './SchemeContext/SchemeProvider'
import { Attraction } from '../../models/Attraction'
import useToast from '../../hooks/useToast'
import { useSaveAttraction } from '../../hooks/queryHooks/attractions/useSaveAttraction'
import { useVisitAttraction } from '../../hooks/queryHooks/attractions/useVisitAttraction'

type AttractionActionsProps = {
    attraction: Attraction
}
const USER_ID = 1
export const AttractionActions = ({ attraction }: AttractionActionsProps) => {
  const theme = useTheme()
  const styles = makeStyles(theme)
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const { mutate: saveAttraction } = useSaveAttraction()
  const { mutate: addToVisited } = useVisitAttraction()
  const onAddToVisitedClick = async () => {
    if (!attraction) { return }
    await addToVisited({ attractionOverpassId: attraction.id, userId: USER_ID })
  }
  const onAddToSavedClick = async () => {
    if (!attraction) { return }
    saveAttraction({ attractionOverpassId: attraction.id, userId: USER_ID })
  }
  const onNavigateClick = async () => {
    if (!attraction) { return }
    await Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${attraction.name} ${attraction.city}`,
    )
  }
  const onSearchInternetClick = async () => {
    if (!attraction) { return }
    await Linking.openURL(
      `https://www.google.com/search?q=${attraction.name} ${attraction.city}`,
    )
  }

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        icon={<Icon size={45} name="folder-special" />}
        onPress={onAddToSavedClick}
      />
      <Button
        style={styles.button}
        icon={<Icon size={45} name="check-circle-outline" />}
        onPress={onAddToVisitedClick}
      />
      <Button
        style={styles.button}
        icon={<Icon size={45} name="location-on" />}
        onPress={onNavigateClick}
      />
      <Button
        style={styles.button}
        icon={<Icon size={45} name="language" />}
        onPress={onSearchInternetClick}
      />
    </View>
  )
}

const makeStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
