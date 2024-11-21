import * as Font from 'expo-font'
import { useState } from 'react'
import AppLoading from 'expo-app-loading'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SchemeProvider } from './components/organisms/SchemeContext/SchemeProvider'
import { MapContextProvider } from './context/Map/MapContext'
import { UserContextProvider } from './context/UserContext'
import { Navigation } from './components/organisms/Navigation'
import QueryClientWrapper from './components/QueryClientWrapper'
import { ProtectedRoute } from './components/ProtectedRoute'

const getFonts = () => Font.loadAsync({
  poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
})

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  const onAppLoadingFinish = async () => {
    setFontsLoaded(true)
  }

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={onAppLoadingFinish}
        onError={console.warn}
      />
    )
  }

  return (
    <UserContextProvider>
      <QueryClientWrapper>
        <MapContextProvider>
          <SchemeProvider>
            <GestureHandlerRootView>
              <BottomSheetModalProvider>
                <ProtectedRoute>
                  <Navigation />
                </ProtectedRoute>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </SchemeProvider>
        </MapContextProvider>
      </QueryClientWrapper>
    </UserContextProvider>
  )
}
