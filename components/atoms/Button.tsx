import { Button as RNButton, ButtonProps as RNButtonProps } from 'react-native-elements'

type ButtonProps = RNButtonProps

export const Button = (props: ButtonProps) => (
  <RNButton {...props} />
)
