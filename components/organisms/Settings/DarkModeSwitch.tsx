import { StyleSheet, Switch, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ThemeType, useScheme } from '../SchemeContext/SchemeProvider'

export const DarkModeSwitch = () => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { scheme, toggleScheme } = useScheme()
  const isDarkEnabled = scheme === 'dark'

  const styles = makeStyles(colors)

  return (
    <>
      <Text style={[styles.text]}>{t('darkMode')}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#9ca3ad' }}
        thumbColor={isDarkEnabled ? '#f4f3f4' : '#f4f3f4'}
        onValueChange={toggleScheme}
        value={isDarkEnabled}
      />
    </>
  )
}

const makeStyles = (color: ThemeType) => StyleSheet.create({
  text: {
    color: color.text,
    fontSize: 18,
    marginBottom: 10,
  },
})
