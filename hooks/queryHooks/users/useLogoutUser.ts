import { useLogoutUserQuery } from '../../../api/users/hooks/useLogoutUserQuery'
import useToast from '../../useToast'
import { useUserContext } from '../../../context/UserContext'

export const useLogoutUser = () => {
  const { showToast } = useToast()
  const { setIsAuthenticated } = useUserContext()

  const query = useLogoutUserQuery({
    onError: async (e) => {
      console.log(e)
      showToast('Nie udało się wylogować.')
    },
    onSuccess: async () => {
      showToast('Wylogowano.')
      setIsAuthenticated(false)
    },
  })

  return query
}
