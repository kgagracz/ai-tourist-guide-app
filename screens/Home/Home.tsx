import { View } from 'react-native'
import '../../i18n'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { MarkerPressEvent } from 'react-native-maps'
import Map from '../../components/organisms/Map/Map'
import { AttractionDetailsModal } from './AttractionDetailsModal'
import { Marker } from '../../models/Marker'
import { Layout } from '../../components/organisms/Layout'

export function Home() {
  const attractionDetailsSheet = useRef<BottomSheetModal | null>(null)

  const openModal = (_: MarkerPressEvent, marker: Marker) => {
    attractionDetailsSheet.current?.present(marker)
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
