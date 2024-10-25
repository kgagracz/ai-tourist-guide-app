import { StyleSheet, View } from 'react-native'
import { PropsWithChildren } from 'react'
import { Theme, useTheme } from '@react-navigation/native'

export const Layout = (props: PropsWithChildren) => {
  const theme = useTheme()
  const styles = makeStyles(theme)

  return <View style={styles.container}>{props.children}</View>
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  container: {
    // marginTop: 20,
  },
})
