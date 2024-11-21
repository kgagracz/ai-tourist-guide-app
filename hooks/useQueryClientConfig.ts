import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

interface UseQueryClientConfig {
  onGlobalError: (error: Error) => void
}

export const useQueryClientConfig = ({ onGlobalError }: UseQueryClientConfig) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: onGlobalError,
    }),
    mutationCache: new MutationCache({
      onError: onGlobalError,
    }),
  })

  return {
    queryClient,
  }
}
