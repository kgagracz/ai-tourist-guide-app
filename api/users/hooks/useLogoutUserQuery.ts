import { useMutation } from '@tanstack/react-query'
import { LOGOUT_USER } from '../queryKeys'
import { MutationHookOptionsModel } from '../../models/MutationHookOptionsModel'
import { logoutUser } from '../services/logoutUser'

interface UseLogoutUserQueryOptions extends MutationHookOptionsModel<any, any>{}

export const useLogoutUserQuery = ({ onError, onSuccess }: UseLogoutUserQueryOptions) => useMutation({
  mutationFn: logoutUser,
  mutationKey: [LOGOUT_USER],
  onSuccess,
  onError,
})
