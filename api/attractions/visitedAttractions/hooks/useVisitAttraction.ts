import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'
import { visitAttraction } from '../services/visitedAttractionsService'
import { VISIT_ATTRACTION } from '../queryKeys'
import { MutationCallbacksModel } from '../../../models/QueryCallbacksModel'
import useToast from '../../../../hooks/useToast'
import { SaveAttractionBody } from '../../savedAttractions/models/saveAttractionModel'

interface UseSaveAttractionOptions extends MutationCallbacksModel {

}

export const useVisitAttraction = (options: UseSaveAttractionOptions = {}) => {
  const { onSuccess, onError } = options
  const { t } = useTranslation()
  const { showToast } = useToast()

  const query = useMutation<unknown, AxiosError, SaveAttractionBody, unknown>({
    mutationFn: visitAttraction,
    mutationKey: [VISIT_ATTRACTION],
    onSuccess,
    onError,
  })
  const { error } = query

  useEffect(() => {
    if (!error) return

    showToast(t('VISITING_ATTRACTION_FAILED'))
  }, [error, t])

  return query
}
