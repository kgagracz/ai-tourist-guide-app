import React, {
  createContext, PropsWithChildren, useContext, useState,
} from 'react'
import { DarkTheme as RNDarkTheme, DefaultTheme, Theme } from '@react-navigation/native'
import { Appearance, ColorSchemeName } from 'react-native'

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
}

export const DarkTheme: Theme = {
  ...RNDarkTheme,
  colors: {
    ...RNDarkTheme.colors,
  },
}

// todo - ustalić typ
export type ThemeType = any
type SchemeContextType = {
  scheme: ColorSchemeName,
  toggleScheme: () => void
}

const SchemeContext = createContext<SchemeContextType | null>(null)

export const SchemeProvider = ({ children }: PropsWithChildren) => {
  const [scheme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme())

  const toggleScheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <SchemeContext.Provider value={{ scheme, toggleScheme }}>
      {children}
    </SchemeContext.Provider>
  )
}

export const useScheme = () => {
  const context = useContext(SchemeContext)
  if (!context) {
    throw new Error('useTheme must be used withing ThemeProvider')
  }
  return context
}
