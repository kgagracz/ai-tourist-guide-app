import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Icon from '@expo/vector-icons/MaterialIcons'
import { Button } from '../../../atoms/Button'

interface ButtonToRender {
    onPress: () => void
    icon: string,
    iconSize?: number
}

interface MapFloatingButtonsProps {
    buttons: ButtonToRender[]
}

export const MapFloatingButtons = ({ buttons }: MapFloatingButtonsProps) => {
  const theme = useTheme()
  const styles = makeStyles(theme)
  return (
    <View style={styles.container}>
      {buttons.map((button) => (
        <Button
          icon={(
            <Icon
              // @ts-ignore
              name={button.icon}
              size={button.iconSize}
              onPress={button.onPress}
            />
          )}
        />
      ))}
    </View>
  )
}

const makeStyles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: theme.colors.background,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    zIndex: 2,
  },
})
