import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { forwardRef, useMemo } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Marker } from '../../models/Marker'
import { ThemeType } from '../../components/organisms/SchemeContext/SchemeProvider'
import { AttractionDetails } from './AttractionDetails'

type AttractionDetailsModalProps = {
  closeModal: () => void
}

export const AttractionDetailsModal = forwardRef<BottomSheetModal, AttractionDetailsModalProps>(({
  closeModal,
}, bottomSheetModalRef) => {
  const snapPoints = ['75%']

  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

  const onModalDismiss = () => {
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
      enableContentPanningGesture={false}
      onDismiss={onModalDismiss}
      enableDismissOnClose
      backdropComponent={CustomBackdrop}
    >
      {(data) => <AttractionDetails marker={data?.data as unknown as Marker} />}
    </BottomSheetModal>
  )
})

const makeStyles = (theme: ThemeType) => StyleSheet.create({
  customBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
