import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { saveAttraction } from '../services/savedAttractionsService'
import { SAVE_ATTRACTION } from '../queryKeys'
import { MutationCallbacksModel } from '../../../models/QueryCallbacksModel'
import { SaveAttractionBody } from '../models/saveAttractionModel'
import useToast from '../../../../hooks/useToast'

interface UseSaveAttractionOptions extends MutationCallbacksModel {

}

export const useSaveAttraction = (options: UseSaveAttractionOptions) => {
  const { onSuccess, onError } = options
  const { t } = useTranslation()
  const { showToast } = useToast()

  const query = useMutation<unknown, AxiosError, SaveAttractionBody, unknown>({
    mutationFn: saveAttraction,
    mutationKey: [SAVE_ATTRACTION],
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
