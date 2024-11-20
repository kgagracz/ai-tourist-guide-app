import { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { NormalText } from '../../atoms/NormalText'

interface SettingItemProps {
    title: string;
    attributeComponent: ReactNode
}

export const SettingItem = ({
  attributeComponent,
  title,
}: SettingItemProps) => {
  const theme = useTheme()
  const styles = makeStyles(theme)
  return (
    <View style={styles.container}>
      <NormalText>{title}</NormalText>
      {typeof attributeComponent === 'string' ? <NormalText>{attributeComponent}</NormalText> : attributeComponent}
    </View>
  )
}

const makeStyles = (theme: Theme): Record<string, StyleProp<ViewStyle>> => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'red',
  },
})
