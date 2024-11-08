import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { saveAttraction } from '../services/savedAttractionsService'
import { SAVE_ATTRACTION } from '../queryKeys'
import { SaveAttractionBody } from '../models/saveAttractionModel'
import { MutationHookOptionsModel } from '../../../models/MutationHookOptionsModel'

interface UseSaveAttractionOptions extends MutationHookOptionsModel<unknown, AxiosError, SaveAttractionBody> {}

export const useSaveAttractionQuery = (options: UseSaveAttractionOptions) => {
  const { onSuccess, onError } = options

  return useMutation<unknown, AxiosError, SaveAttractionBody, unknown>({
    mutationFn: saveAttraction,
    mutationKey: [SAVE_ATTRACTION],
    onSuccess,
    onError,
  })
}
