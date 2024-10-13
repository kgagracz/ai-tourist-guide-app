import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getAttractionIntro } from '../attractions/getAttractionIntro'
import useToast from '../../hooks/useToast'

export const useGetAttractionIntro = (attractionName: string, enabled: boolean) => {
  const toast = useToast()
  const { t } = useTranslation()

  const query = useQuery({
    queryFn: () => getAttractionIntro(attractionName),
    queryKey: [getAttractionIntro, attractionName],
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
