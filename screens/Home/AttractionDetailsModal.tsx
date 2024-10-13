import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { forwardRef, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Marker } from '../../models/Marker'
import { NormalText } from '../../components/atoms/NormalText'
import { ThemeType } from '../../components/organisms/SchemeContext/SchemeProvider'
import { useGetAttractionIntro } from '../../api/hooks/useGetAttractionIntro'
import Loader from '../../components/atoms/Loader'
import { AttractionActions } from '../../components/organisms/AttractionActions'
import { Heading } from '../../components/atoms/Heading'

export const AttractionDetailsModal = forwardRef<BottomSheetModal>((_, ref) => {
  const snapPoints = ['75%']
  const [attractionName, setAttractionName] = useState<string | null>(null)

  // todo - handle attraction === undefined
  const { data: attractionIntro, isLoading: isAttractionIntroLoading } = useGetAttractionIntro(attractionName ?? '', !!attractionName)

  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

  const onModalDismiss = () => {
    setAttractionName(null)
  }

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enableContentPanningGesture={false}
      onDismiss={onModalDismiss}
    >
      {(data) => {
        const {
          title, description, coordinate, attractionId,
        } = data?.data as unknown as Marker

        setAttractionName(title ?? null)

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
})
