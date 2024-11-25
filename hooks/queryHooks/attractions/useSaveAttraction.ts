import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { useSaveAttractionQuery } from '../../../api/attractions/savedAttractions/hooks/useSaveAttractionQuery'
import useToast from '../../useToast'
import { GET_SAVED_ATTRACTIONS } from '../../../api/attractions/savedAttractions/queryKeys'
import { GET_ATTRACTION_INTRO } from '../../../api/attractions/queryKeys'

export const useSaveAttraction = () => {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const onError = useCallback(async () => {
    showToast(t('VISITING_ATTRACTION_FAILED'))
  }, [showToast, t])

  const onSuccess = useCallback(async () => {
    queryClient.invalidateQueries({ queryKey: [GET_SAVED_ATTRACTIONS] })
    queryClient.invalidateQueries({ queryKey: [GET_ATTRACTION_INTRO] })
    showToast('Dodano atrakcję do zapisanych.')
  }, [showToast, queryClient])

  return useSaveAttractionQuery({
    onError,
    onSuccess,
  })
}
