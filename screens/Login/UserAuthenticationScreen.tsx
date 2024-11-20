import { useToggle } from '../../hooks/useToggle'
import { LoginScreen } from './LoginScreen'
import { RegisterScreen } from './RegisterScreen'

export const UserAuthenticationScreen = () => {
  const [loginScreenEnabled, toggleLoginScreenEnabled] = useToggle(true)

  if (loginScreenEnabled) {
    return <LoginScreen toggleLoginScreenEnabled={toggleLoginScreenEnabled} />
  }

  return (
    <RegisterScreen toggleLoginScreenEnabled={toggleLoginScreenEnabled} />
  )
}
