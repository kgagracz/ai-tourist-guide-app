import { Input, InputProps } from 'react-native-elements'
import { forwardRef } from 'react'

interface TextInputProps extends InputProps{}

export const TextInput = forwardRef((props: TextInputProps, ref) => (
  <Input {...props} ref={ref} />
))
