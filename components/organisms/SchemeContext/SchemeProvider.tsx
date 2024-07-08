import React, { createContext, useContext, useState } from 'react'
import {NavigationContainer, DefaultTheme, DarkTheme as RNDarkTheme, Theme} from '@react-navigation/native';
import {Appearance, ColorSchemeName} from "react-native";

export const LightTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

export const DarkTheme: Theme = {
    ...RNDarkTheme,
    colors: {
        ...RNDarkTheme.colors,
    },
};

export type ThemeType = typeof theme[scheme | 'light'];

const SchemeContext = createContext(null)

export const SchemeProvider = ({ children }) => {
    const [scheme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme())

    const toggleScheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    };

    return (
        <SchemeContext.Provider value={{ scheme, toggleScheme }}>
            {children}
        </SchemeContext.Provider>
    )
}

export const useScheme = () => {
    const context = useContext(SchemeContext);
    if (!context) {
        throw new Error('useTheme must be used withing ThemeProvider')
    }
    return context
}
