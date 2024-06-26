import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { SavedAttractions } from '../../../screens/SavedAttractions/SavedAttractions'

const RootStack = createNativeStackNavigator()

export const StackNavigation = () => (
  <RootStack.Navigator>
    <RootStack.Group>
      <RootStack.Screen name="SavedAttractions" component={SavedAttractions} />
    </RootStack.Group>
  </RootStack.Navigator>
)
