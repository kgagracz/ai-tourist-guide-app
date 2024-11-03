import { useMutation } from '@tanstack/react-query'
import { saveAttraction } from '../servies/savedAttractionsService'
import { SAVE_ATTRACTION } from '../queryKeys'
import { MutationCallbacksModel } from '../../../models/QueryCallbacksModel'

interface UseSaveAttractionOptions extends MutationCallbacksModel {

}

export const useSaveAttraction = (options: UseSaveAttractionOptions) => {
  const { onSuccess, onError } = options

  return useMutation({
    mutationFn: saveAttraction,
    mutationKey: [SAVE_ATTRACTION],
    onSuccess,
    onError,
  })
}
