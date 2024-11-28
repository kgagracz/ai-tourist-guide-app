import { ScrollView, StyleSheet, View } from 'react-native'
import { useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import Loader from '../../components/atoms/Loader'
import { NormalText } from '../../components/atoms/NormalText'
import { Marker } from '../../models/Marker'
import { useGetAttractionIntro } from '../../hooks/queryHooks/attractions/useGetAttractionIntro'
import { ThemeType } from '../../components/organisms/SchemeContext/SchemeProvider'
import { AttractionQuestions } from '../../components/organisms/AttractionQuestions.ts'
import { Heading } from '../../components/atoms/Heading'
import { AttractionActions } from '../../components/organisms/AttractionActions'

interface AttractionDetailsProps {
    marker?: Marker
}

export const AttractionDetails = ({ marker }: AttractionDetailsProps) => {
  const attractionId = marker?.attractionId
  const {
    data: attraction,
    isLoading: isAttractionIntroLoading,
  } = useGetAttractionIntro(attractionId ?? -1, !!attractionId)
  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

  if (!marker) {
    return <NormalText>Nie udało się pobrać</NormalText>
  }

  if (isAttractionIntroLoading) {
    return <Loader size="large" />
  }

  if (!attraction) {
    return null
  }

  const { title } = marker

  return (
    <View style={styles.container}>
      <View style={styles.stickyContainer}>
        <Heading>{title}</Heading>
        <AttractionActions attraction={attraction.data.data} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <NormalText>{attraction.data.data.description}</NormalText>
        <AttractionQuestions attractionId={attraction.data.data.overpassId} />
      </ScrollView>
    </View>
  )
}

const makeStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
  },
  stickyContainer: {
    backgroundColor: 'white',
    zIndex: 1,
    elevation: 5,
    display: 'flex',
    gap: 12,
    padding: 12,
  },
  scrollContent: {
    paddingTop: 16, // Odsunięcie przewijanej treści od sticky headera
    paddingHorizontal: 16,
  },
})
