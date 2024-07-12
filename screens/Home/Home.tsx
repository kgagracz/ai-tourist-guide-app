import { View } from 'react-native'
import '../../i18n'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { MarkerPressEvent } from 'react-native-maps'
import Map from '../../components/organisms/Map/Map'
import { AttractionDetails } from './AttractionDetails'
import { Marker } from '../../models/Marker'

export function Home() {
  const attractionDetailsSheet = useRef<BottomSheetModal | null>(null)

  const openModal = (_: MarkerPressEvent, marker: Marker) => {
    attractionDetailsSheet.current?.present(marker)
  }

  return (
    <>
      <View>
        <Map fullScreen onMarkerPress={openModal} />
      </View>
      <AttractionDetails ref={attractionDetailsSheet} />
    </>
  )
}
