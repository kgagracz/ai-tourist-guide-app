import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../../../screens/Home/Home';
import { SavedAttractions } from '../../../screens/SavedAttractions/SavedAttractions';
import SettingsPage from '../Settings/SettingsPage';
import { useTheme} from "../ThemeContext/ThemeProvider";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
                },
                tabBarActiveTintColor: theme === 'dark' ? '#FFF' : '#000',
                tabBarInactiveTintColor: theme === 'dark' ? '#888' : '#888',
            }}
        >
            <Tab.Screen
                name={t('menuMap')}
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="location-on" size={25} color={color} />,
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
                component={Home}
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
    );
};
