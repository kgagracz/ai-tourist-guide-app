import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Theme, useTheme } from '@react-navigation/native'
import { useMemo } from 'react'
import { Button } from '../../components/atoms/Button'
import { Heading } from '../../components/atoms/Heading'
import { TextInput } from '../../components/atoms/TextInput'

export const LoginScreen = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])

  const onSubmit = () => {
    //
  }

  return (
    <View style={styles.container}>
      <Heading>{t('LOGIN_VIEW_TITLE')}</Heading>
      <View style={styles.formContainer}>
        <TextInput placeholder={t('EMAIL_PLACEHOLDER')} />
        <TextInput placeholder={t('PASSWORD_PLACEHOLDER')} />
        <Button />
      </View>
      <Button onPress={onSubmit} title={t('SUBMIT_LOGIN_FORM')} />
    </View>
  )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  formContainer: {
    width: '100%',
  },
})
