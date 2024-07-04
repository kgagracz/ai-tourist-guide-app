import * as Font from 'expo-font'
import { useState,  useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigation } from './components/organisms/Navigation'
import { MapContextProvider } from './context/Map/MapContext'
import {ThemeProvider} from "./components/organisms/ThemeContext/ThemeProvider";

const getFonts = () => Font.loadAsync({
  poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
})

const queryClient = new QueryClient()

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const colorScheme = useColorScheme();

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
        <ThemeProvider value={colorScheme}>
          <Navigation />
        </ThemeProvider>
      </MapContextProvider>
    </QueryClientProvider>
  )
}
