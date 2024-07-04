import { NavigationContainer } from '@react-navigation/native'
import { TabNavigation } from './Navigation/TabNavigation'
import {ThemeProvider} from "./ThemeContext/ThemeProvider";

export const Navigation = () => (
  <NavigationContainer>
      <ThemeProvider>
        <TabNavigation />
      </ThemeProvider>
  </NavigationContainer>
)
