import { useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getReactNativePersistence, initializeAuth, User } from 'firebase/auth'
import { LogBox, StatusBar } from 'react-native'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import AsyncStorage from '@react-native-community/async-storage'

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '../env.development.local'

interface UseQueryClientConfig {
  onGlobalError: (error: Error) => void
  onAuthStateChanged: (user: User | null) => void
}

export const useQueryClientConfig = ({ onGlobalError, onAuthStateChanged }: UseQueryClientConfig) => {
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

  // todo - move this, because its not related to query client
  useEffect(() => {
    const firebaseConfig = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      appId: FIREBASE_APP_ID,
    }

    const app = initializeApp(firebaseConfig)
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
    LogBox.ignoreAllLogs()
    StatusBar.setHidden(true)
    return subscriber
  }, [])

  return {
    queryClient,
  }
}
