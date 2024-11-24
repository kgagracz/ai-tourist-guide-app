import { Linking, StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { useCallback } from 'react'
import { Button } from '../atoms/Button'
import { ThemeType } from './SchemeContext/SchemeProvider'
import { Attraction } from '../../models/Attraction'
import { useSaveAttraction } from '../../hooks/queryHooks/attractions/useSaveAttraction'
import { useVisitAttraction } from '../../hooks/queryHooks/attractions/useVisitAttraction'

type AttractionActionsProps = {
    attraction: Attraction
}

export const AttractionActions = ({ attraction }: AttractionActionsProps) => {
  const theme = useTheme()
  const styles = makeStyles(theme)
  const { mutate: saveAttraction } = useSaveAttraction()
  const { mutate: addToVisited } = useVisitAttraction()

  const onAddToVisitedClick = async () => {
    if (!attraction || attraction.id === -1) { return }
    await addToVisited({ attractionOverpassId: attraction.id })
  }
  const onAddToSavedClick = useCallback(async () => {
    if (!attraction || attraction.id === -1) {
      return
    }
    saveAttraction({ attractionOverpassId: attraction.id })
  }, [attraction, saveAttraction])

  const onNavigateClick = useCallback(async () => {
    if (!attraction) {
      return
    }
    await Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${attraction.name} ${attraction.city}`,
    )
  }, [attraction])

  const onSearchInternetClick = useCallback(async () => {
    if (!attraction) {
      return
    }
    await Linking.openURL(
      `https://www.google.com/search?q=${attraction.name} ${attraction.city}`,
    )
  }, [attraction])

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
