import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegisterUserQuery } from '../../../api/users/hooks/useRegisterUserQuery'
import useToast from '../../useToast'

export const useRegisterUser = () => {
  const { showToast } = useToast()
  const { t } = useTranslation()

  // const navigate = useNavigation()
  const onSuccess = useCallback(async () => {
    // navigate('')
    // logowanie
    showToast(t('REGISTER_SUCCESS'))
  }, [showToast, t])

  const onError = useCallback(async () => {
    // navigate('')
    // logowanie
    showToast(t('REGISTER_FAILED'))
  }, [showToast, t])

  return useRegisterUserQuery({
    onSuccess,
    onError,
  })
}
