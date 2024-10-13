import { Text, TextProps } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Theme, useTheme } from '@react-navigation/native'

export const Heading: React.FC<PropsWithChildren<TextProps>> = (props) => {
  const theme = useTheme()
  const styles = makeStyles(theme)

  return (
    <Text style={styles.heading}>{props.children}</Text>
  )
}

const makeStyles = (theme: Theme) => ({
  heading: {
    fontSize: 24,
  },
})
