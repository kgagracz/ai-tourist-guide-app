import * as Font from 'expo-font';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Home } from './screens/Home/Home';

const getFonts = () => Font.loadAsync({
  poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Home />
  );
}
