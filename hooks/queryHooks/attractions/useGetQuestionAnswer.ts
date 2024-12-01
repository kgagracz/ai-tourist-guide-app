import {
  GetAttractionIntroOptions,
  useGetAttractionIntroQuery,
} from '../../../api/attractions/attractionInfo/hooks/useAskQuestionQuery'

export const useGetQuestionAnswer = ({ onSuccess }: GetAttractionIntroOptions) => useGetAttractionIntroQuery({ onSuccess })
