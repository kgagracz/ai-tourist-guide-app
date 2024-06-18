import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import '../../i18n'
import Map from '../../components/organisms/Map'

export function Home() {
  const { t } = useTranslation()

  return (
    <View>
      <Map fullScreen />
    </View>
  )
}
