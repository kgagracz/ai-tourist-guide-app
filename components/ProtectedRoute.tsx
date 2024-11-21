import { PropsWithChildren } from 'react'
import { useUserContext } from '../context/UserContext'
import { UserAuthenticationScreen } from '../screens/Login/UserAuthenticationScreen'

interface ProtectedRouteProps {
}

export const ProtectedRoute = ({ children }: PropsWithChildren<ProtectedRouteProps>) => {
  const { isAuthenticated } = useUserContext()

  if (!isAuthenticated) {
    return <UserAuthenticationScreen />
  }

  return children
}
