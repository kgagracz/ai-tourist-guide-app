import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Theme, useTheme } from '@react-navigation/native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { Heading } from '../atoms/Heading'

export const HomeViewHeader = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const styles = makeStyles(theme)
  return (
    <View style={styles.container}>
      <Heading>{t('menuMap')}</Heading>
      <Icon size={45} name="folder-special" />
    </View>
  )
}

const makeStyles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
