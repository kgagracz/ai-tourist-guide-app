import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { useGetAttractionQuestions } from '../../hooks/queryHooks/attractions/useGetAttractionQuestions'
import { Button } from '../atoms/Button'
import { BoldText } from '../atoms/BoldText'
import { useGetQuestionAnswer } from '../../hooks/queryHooks/attractions/useGetQuestionAnswer'

interface AttractionQuestionsProps {
    attractionId: number
}

export const AttractionQuestions = ({ attractionId }: AttractionQuestionsProps) => {
  const { data: questions } = useGetAttractionQuestions(attractionId)
  const { mutate: askQuestion } = useGetQuestionAnswer()
  const { t } = useTranslation()
  const theme = useTheme()
  const styles = makeStyles(theme)
  const onPress = useCallback((question: string) => askQuestion(question), [askQuestion])

  return (
    <View style={styles.container}>
      <BoldText style={styles.title}>{t('ATTRACTION_QUESTIONS_TITLE')}</BoldText>
      <View style={styles.questionsList}>
        {questions?.map((question) => <Button key={question} title={question} onPress={() => onPress(question)} />)}
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
