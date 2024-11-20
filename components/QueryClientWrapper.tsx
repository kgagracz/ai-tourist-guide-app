import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useCallback } from 'react'
import { AxiosError } from 'axios'
import { User } from 'firebase/auth'
import { useQueryClientConfig } from '../hooks/useQueryClientConfig'
import { useUserContext } from '../context/UserContext'

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
    onAuthStateChanged,
  })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryClientWrapper
