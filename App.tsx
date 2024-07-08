import * as Font from 'expo-font'
import { useState } from 'react'
import AppLoading from 'expo-app-loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SchemeProvider } from './components/organisms/SchemeContext/SchemeProvider'
import { Navigation } from './components/organisms/Navigation'
import { MapContextProvider } from './context/Map/MapContext'

const getFonts = () => Font.loadAsync({
  poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
})

const queryClient = new QueryClient()

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MapContextProvider>
        <SchemeProvider>
          <Navigation />
        </SchemeProvider>
      </MapContextProvider>
    </QueryClientProvider>
  )
}
