import { Linking, StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../atoms/Button'
import { ThemeType } from './SchemeContext/SchemeProvider'
import { Attraction } from '../../models/Attraction'
import { addToVisitedAttractions } from '../../api/visitedAttractions.api'
import { addToSavedAttractions } from '../../api/savedAttractions.api'
import useToast from '../../hooks/useToast'

type AttractionActionsProps = {
    attraction: Attraction
}

export const AttractionActions = ({ attraction }: AttractionActionsProps) => {
  const theme = useTheme()
  const styles = makeStyles(theme)
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { mutateAsync: addToVisitedMutate } = useMutation({
    mutationKey: ['attractions', 'visitedAttractions'],
    mutationFn: (attractionToAdd: Attraction) => addToVisitedAttractions(attractionToAdd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitedAttractions'] })
      showToast('Oznaczono atrakcję jako odwiedzoną.')
    },
  }, queryClient)
  const { mutateAsync: addToSavedMutate } = useMutation({
    mutationKey: ['attractions', 'savedAttractions'],
    mutationFn: (attractionToAdd: Attraction) => addToSavedAttractions(attractionToAdd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedAttractions'] })
      showToast('Zapisano atrakcję.')
    },
  }, queryClient)
  const onAddToVisitedClick = async () => {
    if (!attraction) { return }
    await addToVisitedMutate(attraction)
  }
  const onAddToSavedClick = async () => {
    if (!attraction) { return }
    await addToSavedMutate(attraction)
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
