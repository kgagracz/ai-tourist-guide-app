import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Theme, useTheme } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { Button } from '../../components/atoms/Button'
import { Heading } from '../../components/atoms/Heading'
import { TextInput } from '../../components/atoms/TextInput'
import { useLoginUser } from '../../hooks/queryHooks/users/useLoginUser'

interface LoginScreenProps {
  toggleLoginScreenEnabled?: () => void
}

export const LoginScreen = ({ toggleLoginScreenEnabled }: LoginScreenProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    mutate: loginUser,
    isPending,
  } = useLoginUser()

  const onSubmit = () => {
    loginUser({ email, password })
  }

  return (
    <View style={styles.container}>
      <Heading>{t('LOGIN_VIEW_TITLE')}</Heading>
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder={t('EMAIL_PLACEHOLDER')}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder={t('PASSWORD_PLACEHOLDER')}
        />
        <Button loading={isPending} onPress={onSubmit} title={t('SUBMIT_LOGIN_FORM')} />
      </View>
      <Button onPress={toggleLoginScreenEnabled} title={t('DONT_HAVE_ACCOUNT')} />
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
