import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'
import Icon from '@expo/vector-icons/MaterialIcons'
import { Home } from '../../screens/Home/Home'

const Tab = createBottomTabNavigator()
export const Navigation = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator>
      <Tab.Screen name={t('menuMap')} component={Home} options={{ tabBarIcon: () => <Icon name="location-on" size={25} /> }} />
      <Tab.Screen name={t('menuSaved')} component={Home} options={{ tabBarIcon: () => <Icon name="folder-special" size={25} /> }} />
      <Tab.Screen name={t('menuVisited')} component={Home} options={{ tabBarIcon: () => <Icon name="check-circle-outline" size={25} /> }} />
      <Tab.Screen name={t('menuSettings')} component={Home} options={{ tabBarIcon: () => <Icon name="settings" size={25} /> }} />
    </Tab.Navigator>
  )
}
