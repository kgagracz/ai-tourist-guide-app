import axios from 'axios'
import { useLoginUserQuery } from '../../../api/users/hooks/useLoginUserQuery'
import useToast from '../../useToast'
import { useUserContext } from '../../../context/UserContext'

export const useLoginUser = () => {
  const { showToast } = useToast()
  const { setIsAuthenticated } = useUserContext()

  const query = useLoginUserQuery({
    onError: async (e) => {
      console.log(e)
      showToast('Nie udało się zalogować')
    },
    onSuccess: async (data) => {
      axios.defaults.headers.common.Authorization = `Bearer ${data.user.stsTokenManager.accessToken}`
      setIsAuthenticated(true)
      showToast(`witaj ${data.user.email}`)
    },
  })

  return query
}
