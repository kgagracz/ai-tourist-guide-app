import { NavigationContainer } from '@react-navigation/native'
import { TabNavigation } from './Navigation/TabNavigation'
import { LightTheme, DarkTheme, useScheme } from './SchemeContext/SchemeProvider'

export const Navigation = () => {
  const { scheme } = useScheme()

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <TabNavigation />
    </NavigationContainer>
  )
}
