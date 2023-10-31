import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

export const BoldText: React.FC<TextProps & {text: string}> = (props) => (
  <Text style={styles.text} {...props}>
    {props.text}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins-bold',
  },
})
