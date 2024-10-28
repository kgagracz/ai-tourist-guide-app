import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getAttractionIntro } from '../services/getAttractionIntro'
import useToast from '../../../hooks/useToast'
import { GET_ATTRACTION_INTRO } from '../queryKeys'

export const useGetAttractionIntro = (attractionName: string, enabled: boolean) => {
  const toast = useToast()
  const { t } = useTranslation()

  const query = useQuery({
    queryFn: () => getAttractionIntro(attractionName),
    queryKey: [GET_ATTRACTION_INTRO, attractionName],
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
