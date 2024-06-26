import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

export const BoldText: React.FC<PropsWithChildren<TextProps>> = (props) => (
  <Text style={styles.text} {...props}>
    {props.children}
  </Text>
)

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins-bold',
  },
})
