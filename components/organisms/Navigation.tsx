import { NavigationContainer } from '@react-navigation/native'
import { TabNavigation } from './Navigation/TabNavigation'
import { DarkTheme, LightTheme, useScheme } from './SchemeContext/SchemeProvider'
import { MapSearchContextProvider } from '../../context/MapSearchContext'

export const Navigation = () => {
  const { scheme } = useScheme()

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      {/* todo - maybe exists better solution than context */}
      <MapSearchContextProvider>
        <TabNavigation />
      </MapSearchContextProvider>
    </NavigationContainer>
  )
}
