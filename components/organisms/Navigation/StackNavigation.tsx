import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { MapSearch } from '../../../screens/MapSearch/MapSearch'
import { Home } from '../../../screens/Home/Home'

const RootStack = createNativeStackNavigator()

export const StackNavigation = () => (
  <RootStack.Navigator>
    <RootStack.Group>
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="MapSearch"
        component={MapSearch}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Group>
  </RootStack.Navigator>
)
