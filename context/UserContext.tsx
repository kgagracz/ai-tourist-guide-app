import React, { useContext, useState } from 'react'
import { User } from 'firebase/auth'

interface UserContextType {
    did401ErrorOccurred: boolean,
    setDid401ErrorOccurred: React.Dispatch<React.SetStateAction<boolean>>
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = React.createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [did401ErrorOccurred, setDid401ErrorOccurred] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <UserContext.Provider value={{
      did401ErrorOccurred,
      setDid401ErrorOccurred,
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (context === null) {
    throw new Error('useUserContext must be used within UserContext.')
  }

  return context
}
