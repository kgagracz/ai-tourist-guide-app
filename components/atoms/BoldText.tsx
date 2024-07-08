import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { ThemeType } from '../organisms/SchemeContext/SchemeProvider'

export const BoldText: React.FC<PropsWithChildren<TextProps>> = (props) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
    <Text style={styles.text} {...props}>
      {props.children}
    </Text>
  )
}

const makeStyles = (colors: ThemeType) => StyleSheet.create({
  text: {
    fontFamily: 'poppins-bold',
    color: colors.text,
  },
})
