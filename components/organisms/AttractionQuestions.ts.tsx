import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useGetAttractionQuestions } from '../../hooks/queryHooks/attractions/useGetAttractionQuestions'
import { Button } from '../atoms/Button'
import { BoldText } from '../atoms/BoldText'

interface AttractionQuestionsProps {
    attractionId: number
}

export const AttractionQuestions = ({ attractionId }: AttractionQuestionsProps) => {
  const { data } = useGetAttractionQuestions(attractionId)
  const { t } = useTranslation()
  const theme = useTheme()
  const styles = makeStyles(theme)
  return (
    <View style={styles.container}>
      <BoldText style={styles.title}>{t('ATTRACTION_QUESTIONS_TITLE')}</BoldText>
      <View style={styles.questionsList}>
        {data?.data.data.map((question) => <Button key={question} title={question} />)}
      </View>
    </View>
  )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  container: {},
  questionsList: {
    display: 'flex',
    gap: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
})
