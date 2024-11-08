import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { forwardRef, useMemo, useState } from 'react'
import {
  ScrollView, StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Marker } from '../../models/Marker'
import { NormalText } from '../../components/atoms/NormalText'
import { ThemeType } from '../../components/organisms/SchemeContext/SchemeProvider'
import Loader from '../../components/atoms/Loader'
import { AttractionActions } from '../../components/organisms/AttractionActions'
import { Heading } from '../../components/atoms/Heading'
import { useGetAttractionIntro } from '../../hooks/queryHooks/attractions/useGetAttractionIntro'

type AttractionDetailsModalProps = {
  closeModal: () => void
}

export const AttractionDetailsModal = forwardRef<BottomSheetModal, AttractionDetailsModalProps>(({
  closeModal,
}, bottomSheetModalRef) => {
  const snapPoints = ['75%']
  const [attractionName, setAttractionName] = useState<string | null>(null)

  // todo - handle attraction === undefined
  const {
    data: attractionIntro,
    isLoading: isAttractionIntroLoading,
  } = useGetAttractionIntro(attractionName ?? '', !!attractionName)

  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

  const onModalDismiss = () => {
    setAttractionName(null)
    closeModal()
  }

  const CustomBackdrop = () => (
    <TouchableWithoutFeedback onPress={onModalDismiss}>
      <View style={styles.customBackdrop} />
    </TouchableWithoutFeedback>
  )

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      // enableContentPanningGesture={false}
      onDismiss={onModalDismiss}
      enableDismissOnClose
      backdropComponent={CustomBackdrop}
    >
      {(data) => {
        const {
          title, coordinate, attractionId,
        } = data?.data as unknown as Marker

        if (title) setAttractionName(title)

        return (
          <View style={styles.attractionDetailsContainer}>
            <Heading>{title}</Heading>
            <AttractionActions attraction={{
              location: coordinate,
              city: 'Brak',
              name: title,
              id: attractionId ?? -1,
            }}
            />
            <ScrollView>
              {isAttractionIntroLoading && <Loader />}
              {attractionIntro && <NormalText>{attractionIntro}</NormalText>}
            </ScrollView>
          </View>
        )
      }}
    </BottomSheetModal>
  )
})

const makeStyles = (theme: ThemeType) => StyleSheet.create({
  attractionDetailsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    display: 'flex',
    gap: 24,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  customBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
