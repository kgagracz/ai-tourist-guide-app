import { ScrollView, StyleSheet, View } from 'react-native'
import { useMemo } from 'react'
import { useTheme } from '@react-navigation/native'
import { Heading } from '../../components/atoms/Heading'
import { AttractionActions } from '../../components/organisms/AttractionActions'
import Loader from '../../components/atoms/Loader'
import { NormalText } from '../../components/atoms/NormalText'
import { Marker } from '../../models/Marker'
import { useGetAttractionIntro } from '../../hooks/queryHooks/attractions/useGetAttractionIntro'
import { ThemeType } from '../../components/organisms/SchemeContext/SchemeProvider'

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

  if (!attraction) {
    return null
  }

  const { title } = marker

  return (
    <View style={styles.attractionDetailsContainer}>
      <Heading>{title}</Heading>
      <AttractionActions attraction={attraction.data.data} />
      <ScrollView>
        {isAttractionIntroLoading && <Loader />}
        {attraction && <NormalText>{attraction.data.data.description}</NormalText>}
      </ScrollView>
    </View>
  )
}

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