import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'

export const NormalText: React.FC<TextProps & {text: string}> = (props) => (
  <Text style={{ ...style.text }} {...props}>
    {props.text}
  </Text>
)

const style = StyleSheet.create({
  text: {
    fontFamily: 'poppins',
  },
})
