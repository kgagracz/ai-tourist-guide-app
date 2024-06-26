import { Button as RNButton, ButtonProps as RNButtonProps } from 'react-native-elements'

type ButtonProps = RNButtonProps

export const Button = ({ onPress, title, icon }: ButtonProps) => (
  <RNButton onPress={onPress} title={title} icon={icon} />
)
