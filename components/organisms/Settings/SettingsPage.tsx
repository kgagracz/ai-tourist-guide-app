import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { DarkModeSwitch } from './DarkModeSwitch'
import { SettingItem } from '../SettingItem/SettingItem'
import { Button } from '../../atoms/Button'
import { useLogoutUser } from '../../../hooks/queryHooks/users/useLogoutUser'

const SettingsPage = () => {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { mutate: logout } = useLogoutUser()

  return (
    <View style={[
      styles.container, { backgroundColor: colors.background },
    ]}
    >
      <View style={styles.settingsList}>
        <SettingItem title={t('darkMode')} attributeComponent={<DarkModeSwitch />} />
        <SettingItem title="Wyloguj" attributeComponent="test" />
      </View>
      <Button onPress={logout} title="Wyloguj" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsList: {
    height: 'auto',
    width: '100%',
  },
})

export default SettingsPage
