import { StyleSheet, Text, TextProps } from 'react-native'
import React, { PropsWithChildren } from 'react'

export const NormalText: React.FC<PropsWithChildren<TextProps>> = (props) => (
  <Text style={{ ...style.text }} {...props}>
    {props.children}
  </Text>
)

const style = StyleSheet.create({
  text: {
    fontFamily: 'poppins',
  },
})
