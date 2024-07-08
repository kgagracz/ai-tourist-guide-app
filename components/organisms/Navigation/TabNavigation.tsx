import Icon from '@expo/vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../../../screens/Home/Home'
import { SavedAttractions } from '../../../screens/SavedAttractions/SavedAttractions'
import { VisitedAttractions } from '../../../screens/VisitedAttractions/VisitedAttractions'

const Tab = createBottomTabNavigator()

export const TabNavigation = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator>
      <Tab.Screen name={t('menuMap')} component={Home} options={{ tabBarIcon: () => <Icon name="location-on" size={25} /> }} />
      <Tab.Screen name={t('menuSaved')} component={SavedAttractions} options={{ tabBarIcon: () => <Icon name="folder-special" size={25} /> }} />
      <Tab.Screen name={t('menuVisited')} component={VisitedAttractions} options={{ tabBarIcon: () => <Icon name="check-circle-outline" size={25} /> }} />
      <Tab.Screen name={t('menuSettings')} component={Home} options={{ tabBarIcon: () => <Icon name="settings" size={25} /> }} />
    </Tab.Navigator>
  )
}
