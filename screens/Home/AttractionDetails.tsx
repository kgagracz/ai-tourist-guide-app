import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { forwardRef, useMemo, useState } from 'react'
import { Linking, StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Marker } from '../../models/Marker'
import { getAttraction } from '../../api/attraction.api'
import { BoldText } from '../../components/atoms/BoldText'
import { NormalText } from '../../components/atoms/NormalText'
import { Button } from '../../components/atoms/Button'
import { ThemeType } from '../../components/organisms/SchemeContext/SchemeProvider'
import { addToVisitedAttractions } from '../../api/visitedAttractions.api'
import { Attraction } from '../../models/Attraction'
import { addToSavedAttractions } from '../../api/savedAttractions.api'
import useToast from '../../hooks/useToast'

export const AttractionDetails = forwardRef<BottomSheetModal>((_, ref) => {
  const snapPoints = ['25%']
  const [attractionIdState, setAttractionIdState] = useState<number | null>(null)
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { data: attraction, isLoading } = useQuery({
    queryKey: ['attractions', attractionIdState],
    queryFn: () => getAttraction(attractionIdState),
  })
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
  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
    >
      {(data) => {
        const {
          title, description, coordinate, attractionId,
        } = data?.data as unknown as Marker

        setAttractionIdState(attractionId ?? null)

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
          <View style={styles.attractionDetailsContainer}>
            <View>
              <BoldText>{title}</BoldText>
              <NormalText>{description}</NormalText>
            </View>
            <View style={styles.iconsContainer}>
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
          </View>
        )
      }}
    </BottomSheetModal>
  )
})

const makeStyles = (theme: ThemeType) => StyleSheet.create({
  attractionDetailsContainer: {
    padding: 12,
    display: 'flex',
    gap: 24,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
