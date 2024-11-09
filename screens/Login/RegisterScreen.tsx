import { StyleSheet, TextInput, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Theme, useTheme } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { Button } from '../../components/atoms/Button'
import { Heading } from '../../components/atoms/Heading'
import { useRegisterUser } from '../../hooks/queryHooks/users/useRegisterUser'
import { RegisterUserBodyModel } from '../../api/users/models/registerUserBodyModel'
import { validateRegisterUserBody } from '../../api/users/services/validateRegisterUserBody'

export const RegisterScreen = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const styles = useMemo(() => makeStyles(theme), [theme])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const {
    mutate: registerUser, data, error, isPending,
  } = useRegisterUser()

  const onSubmit = () => {
    const registerBody: RegisterUserBodyModel = {
      email, password,
    }
    const { isValid } = validateRegisterUserBody(registerBody, t)
    if (!isValid) {
      return
    }

    registerUser(registerBody)
  }

  return (
    <View style={styles.container}>
      <Heading>{t('REGISTER_VIEW_TITLE')}</Heading>
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
        <TextInput
          onChangeText={setDisplayName}
          value={displayName}
          placeholder={t('DISPLAY_NAME_PLACEHOLDER')}
        />
        <Button loading={isPending} onPress={onSubmit} title={t('SUBMIT_REGISTER_FORM')} />
      </View>
      <Button title={t('ALREADY_HAVE_ACCOUNT')} />
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
    display: 'flex',
    gap: 12,
    padding: 20,
  },
})
