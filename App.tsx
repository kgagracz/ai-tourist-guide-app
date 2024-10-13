import * as Font from 'expo-font'
import { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native'
import { SchemeProvider } from './components/organisms/SchemeContext/SchemeProvider'
import { Navigation } from './components/organisms/Navigation'
import { MapContextProvider } from './context/Map/MapContext'
import { initAsyncStorage } from './services/asyncStorage'

const getFonts = () => Font.loadAsync({
  poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
})

const queryClient = new QueryClient()

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    LogBox.ignoreAllLogs()
  }, [])

  const onAppLoadingFinish = async () => {
    setFontsLoaded(true)
    await initAsyncStorage()
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
    <QueryClientProvider client={queryClient}>
      <MapContextProvider>
        <SchemeProvider>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <Navigation />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SchemeProvider>
      </MapContextProvider>
    </QueryClientProvider>
  )
}
