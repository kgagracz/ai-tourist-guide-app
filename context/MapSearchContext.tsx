import {
  createContext, PropsWithChildren, useContext, useState,
} from 'react'

type MapSearchContextType = {
    phrase: string
    setPhrase: (phrase: string) => void
}

const MapSearchContext = createContext<MapSearchContextType | null>(null)

export const MapSearchContextProvider = ({ children }: PropsWithChildren) => {
  const [phrase, setPhrase] = useState('')

  const onPhraseChange = (newPhrase: string) => setPhrase(newPhrase)

  return (
    <MapSearchContext.Provider value={{
      phrase, setPhrase: onPhraseChange,
    }}
    >
      {children}
    </MapSearchContext.Provider>
  )
}

export const useMapSearchContext = () => {
  const context = useContext(MapSearchContext)
  if (!context) {
    throw new Error('useMapSearhContext must be used within MapSearchContextProvider.')
  }
  return context
}
