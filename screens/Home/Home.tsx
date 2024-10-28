import { View } from 'react-native'
import '../../i18n'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { MarkerPressEvent } from 'react-native-maps'
import Map from '../../components/organisms/Map/Map'
import { AttractionDetailsModal } from './AttractionDetailsModal'
import { Marker } from '../../models/Marker'
import { useMapContext } from '../../context/Map/MapContext'
import { Layout } from '../../components/organisms/Layout'

export function Home() {
  const attractionDetailsSheet = useRef<BottomSheetModal | null>(null)
  const { setMapRegion } = useMapContext()

  const openModal = (_: MarkerPressEvent, marker: Marker) => {
    attractionDetailsSheet.current?.present(marker)
    // @ts-ignore
    // setMapRegion((prev) => ({
    //   ...prev,
    //   latitudeDelta: 0.1,
    //   longitudeDelta: 0.1,
    // }))
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
