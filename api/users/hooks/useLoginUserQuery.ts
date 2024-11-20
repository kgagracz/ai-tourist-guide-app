import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../services/loginUser'
import { LOGIN_USER } from '../queryKeys'
import { MutationHookOptionsModel } from '../../models/MutationHookOptionsModel'

interface UseLoginUserQueryOptions extends MutationHookOptionsModel<any, any>{}

export const useLoginUserQuery = ({ onError, onSuccess }: UseLoginUserQueryOptions) => useMutation({
  mutationFn: loginUser,
  mutationKey: [LOGIN_USER],
  onSuccess,
  onError,
})
