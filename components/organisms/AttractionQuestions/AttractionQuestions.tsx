import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { BoldText } from '../../atoms/BoldText'
import { useGetQuestionAnswer } from '../../../hooks/queryHooks/attractions/useGetQuestionAnswer'
import Loader from '../../atoms/Loader'
import { AttractionQuestionsList } from './AttractionQuestionsList'
import { Question } from '../../../models/Question'
import { Answer } from '../../../models/Answer'
import { QuestionAnswerRequest } from '../../../api/attractions/attractionInfo/models/QuestionAnswerRequest'
import { AttractionAnswers } from '../AttractionAnswers/AttractionAnswers'

interface AttractionQuestionsProps {
    attractionId: number
}
export interface AskedQuestion {
  question: Question
  answer?: Answer
}

export const AttractionQuestions = ({ attractionId }: AttractionQuestionsProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const styles = makeStyles(theme)
  const [askedQuestions, setAskedQuestions] = useState<AskedQuestion[]>([])

  const addAskedQuestion = (
    question: Question,
    answer: Answer,
  ) => setAskedQuestions((prev) => [...prev, { question, answer }])
  const {
    mutate: askQuestion, isPending,
  } = useGetQuestionAnswer({
    onSuccess: async (data, variables) => addAskedQuestion(variables?.question, data.data.data),
  })

  const onPress = useCallback((questionAnswerMutateArgs: QuestionAnswerRequest) => {
    askQuestion(questionAnswerMutateArgs)
  }, [askQuestion])

  const isQuestionAsked = (question: Question) => !!askedQuestions.find(
    (askedQuestion) => askedQuestion.question === question,
  )

  return (
    <View style={styles.container}>
      <AttractionAnswers askedQuestions={askedQuestions} />
      {isPending && <Loader />}
      <BoldText style={styles.title}>{t('ATTRACTION_QUESTIONS_TITLE')}</BoldText>
      <AttractionQuestionsList
        attractionId={attractionId}
        onQuestionButtonPress={onPress}
        checkDisabled={isQuestionAsked}
      />
    </View>
  )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  container: {},
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
})
