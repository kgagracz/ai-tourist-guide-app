import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetAttractionIntroQuery } from '../../../api/attractions/attractionInfo/hooks/useGetAttractionIntroQuery'
import useToast from '../../useToast'

export const useGetAttractionIntro = (attractionName: string, enabled: boolean) => {
  const toast = useToast()
  const { t } = useTranslation()

  const query = useGetAttractionIntroQuery({
    attractionName,
    select: (data) => data.data.message,
    enabled,
  })

  useEffect(() => {
    if (query.isError) {
      toast.showToast(t('errorOccurred'))
    }
  }, [query.isError, t, toast])

  return query
}
