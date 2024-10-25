import { Dispatch, useState } from 'react'

export const useToggle = (defaultState: boolean = false) => {
  const [state, setState] = useState(defaultState)

  const toggle = () => setState((prev) => !prev)

  return [state, toggle, setState] as [boolean, () => void, Dispatch<boolean>]
}
