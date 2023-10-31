import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, View } from 'react-native'
import { NormalText } from '../../components/atoms/NormalText'
import { BoldText } from '../../components/atoms/BoldText'
import '../../i18n'

export function Home() {
  const { t } = useTranslation()

  return (
    <View>
      <NormalText style={styles.helloText} text={t('welcomeMessage')} />
      <BoldText style={styles.currentCityName} text="Kraków" />
      <Image source={require('../../assets/images/cracow.jpg')} style={styles.currentCityImage} />
      {/* <StatusBar style={"auto"} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  helloText: {
    fontSize: 16,
    marginTop: 70,
    textAlign: 'center',
  },
  currentCityName: {
    fontSize: 28,
    textAlign: 'center',
  },
  currentCityImage: {
    height: 400,
    objectFit: 'cover',
  },
})
