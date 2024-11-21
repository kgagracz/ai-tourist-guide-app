import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useCallback, useEffect } from 'react'
import { AxiosError } from 'axios'
import { User } from 'firebase/auth'
import { LogBox, StatusBar } from 'react-native'
import { useQueryClientConfig } from '../hooks/useQueryClientConfig'
import { useUserContext } from '../context/UserContext'
import { auth } from '../firebase'

const QueryClientWrapper = ({ children }: PropsWithChildren) => {
  const { setIsAuthenticated, setUser } = useUserContext()

  const onGlobalError = useCallback((error: unknown) => {
    if ((error as AxiosError).status === 401) {
      setIsAuthenticated(false)
    }
  }, [setIsAuthenticated])

  const onAuthStateChanged = useCallback((user: User | null) => {
    setUser(user)
    setIsAuthenticated(!!user)
  }, [setUser])

  const { queryClient } = useQueryClientConfig({
    onGlobalError,
  })

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
    LogBox.ignoreAllLogs()
    StatusBar.setHidden(true)
    return subscriber
  }, [])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryClientWrapper
