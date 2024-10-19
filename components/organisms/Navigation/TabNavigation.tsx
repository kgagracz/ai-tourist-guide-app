/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import Icon from '@expo/vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../../../screens/Home/Home'
import { SavedAttractions } from '../../../screens/SavedAttractions/SavedAttractions'
import SettingsPage from '../Settings/SettingsPage'
import { useScheme } from '../SchemeContext/SchemeProvider'
import { VisitedAttractions } from '../../../screens/VisitedAttractions/VisitedAttractions'
import { HomeViewHeader } from '../HomeViewHeader'

const Tab = createBottomTabNavigator()

export const TabNavigation = () => {
  const { t } = useTranslation()
  const { scheme } = useScheme()

  return (
    <Tab.Navigator
      screenOptions={{
        // todo - style osobno`
        tabBarStyle: {
          backgroundColor: scheme === 'dark' ? '#333' : '#FFF',
        },
        tabBarActiveTintColor: scheme === 'dark' ? '#FFF' : '#000',
        tabBarInactiveTintColor: scheme === 'dark' ? '#888' : '#888',
      }}
    >
      <Tab.Screen
        name={t('menuMap')}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Icon name="location-on" size={25} color={color} />,
          header: HomeViewHeader,
        }}
      />
      <Tab.Screen
        name={t('menuSaved')}
        component={SavedAttractions}
        options={{
          tabBarIcon: ({ color }) => <Icon name="folder-special" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name={t('menuVisited')}
        component={VisitedAttractions}
        options={{
          tabBarIcon: ({ color }) => <Icon name="check-circle-outline" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name={t('menuSettings')}
        component={SettingsPage}
        options={{
          tabBarIcon: ({ color }) => <Icon name="settings" size={25} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
