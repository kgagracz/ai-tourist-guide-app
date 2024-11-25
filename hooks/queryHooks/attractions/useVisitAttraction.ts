import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { useVisitAttractionQuery } from '../../../api/attractions/visitedAttractions/hooks/useVisitAttractionQuery'
import useToast from '../../useToast'
import { GET_VISITED_ATTRACTIONS } from '../../../api/attractions/visitedAttractions/queryKeys'
import { GET_ATTRACTION_INTRO } from '../../../api/attractions/queryKeys'

export const useVisitAttraction = () => {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const onError = useCallback(async () => {
    showToast(t('VISITING_ATTRACTION_FAILED'))
  }, [showToast, t])

  const onSuccess = useCallback(async () => {
    showToast('Dodano atrakcję do odwiedzonych.')
    queryClient.invalidateQueries({ queryKey: [GET_VISITED_ATTRACTIONS] })
    queryClient.invalidateQueries({ queryKey: [GET_ATTRACTION_INTRO] })
  }, [showToast, queryClient])

  return useVisitAttractionQuery({
    onSuccess,
    onError,
  })
}
