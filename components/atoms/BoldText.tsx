import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { ThemeType } from '../organisms/SchemeContext/SchemeProvider'

export const BoldText: React.FC<PropsWithChildren<TextProps>> = (props) => {
  const { colors } = useTheme()
  const styles = {
    ...makeStyles(colors),
    ...Object(props.style),
  }
  return (
    <Text {...props} style={styles.text}>
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
