import { View } from 'react-native'
import '../../i18n'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { MarkerPressEvent } from 'react-native-maps'
import Map from '../../components/organisms/Map/Map'
import { AttractionDetailsModal } from './AttractionDetailsModal'
import { Marker } from '../../models/Marker'
import { Layout } from '../../components/organisms/Layout'
import { useMapContext } from '../../context/Map/MapContext'
import { getRegionFromMarker } from '../../services/marker'

export function Home() {
  const attractionDetailsSheet = useRef<BottomSheetModal | null>(null)
  const { moveMapToRegion } = useMapContext()

  const openModal = (_: MarkerPressEvent, marker: Marker) => {
    attractionDetailsSheet.current?.present(marker)
    const region = getRegionFromMarker(marker)
    moveMapToRegion(region)
  }

  return (
    <Layout>
      <View>
        <Map fullScreen onMarkerPress={openModal} />
      </View>
      <AttractionDetailsModal ref={attractionDetailsSheet} />
    </Layout>
  )
}
