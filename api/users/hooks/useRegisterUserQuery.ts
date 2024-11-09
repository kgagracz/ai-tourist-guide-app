import { useMutation } from '@tanstack/react-query'
import { REGISTER_USER } from '../queryKeys'
import { MutationHookOptionsModel } from '../../models/MutationHookOptionsModel'
import { registerUser } from '../services/registerUser'

interface UseRegisterUserQueryOptions extends MutationHookOptionsModel {}

export const useRegisterUserQuery = (options: UseRegisterUserQueryOptions) => {
  const { onSuccess, onError } = options

  return useMutation({
    mutationKey: [REGISTER_USER],
    mutationFn: registerUser,
    onSuccess,
    onError,
  })
}
