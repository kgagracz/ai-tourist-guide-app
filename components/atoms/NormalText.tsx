import { StyleSheet, Text, TextProps } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { useTheme } from '@react-navigation/native'
import { ThemeType } from '../organisms/SchemeContext/SchemeProvider'

export const NormalText: React.FC<PropsWithChildren<TextProps>> = (props) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
    <Text style={{ ...styles.text }} {...props}>
      {props.children}
    </Text>
  )
}

const makeStyles = (colors: ThemeType) => StyleSheet.create({
  text: {
    fontFamily: 'poppins',
    color: colors.text,
  },
})
