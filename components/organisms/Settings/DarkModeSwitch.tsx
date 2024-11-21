import { Switch } from 'react-native'
import React from 'react'
import { useScheme } from '../SchemeContext/SchemeProvider'

export const DarkModeSwitch = () => {
  const { scheme, toggleScheme } = useScheme()
  const isDarkEnabled = scheme === 'dark'

  return (
    <Switch
      trackColor={{ false: '#767577', true: '#9ca3ad' }}
      thumbColor={isDarkEnabled ? '#f4f3f4' : '#f4f3f4'}
      onValueChange={toggleScheme}
      value={isDarkEnabled}
    />
  )
}
