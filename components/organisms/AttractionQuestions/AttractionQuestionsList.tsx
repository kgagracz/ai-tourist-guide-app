import { StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { useMutationState } from '@tanstack/react-query'
import { QuestionAnswerRequest } from '../../../api/attractions/attractionInfo/models/QuestionAnswerRequest'
import { Button } from '../../atoms/Button'
import { useGetAttractionQuestions } from '../../../hooks/queryHooks/attractions/useGetAttractionQuestions'
import { useGetAttractionIntro } from '../../../hooks/queryHooks/attractions/useGetAttractionIntro'
import { GET_ATTRACTION_QUESTION_ANSWER } from '../../../api/attractions/queryKeys'
import Loader from '../../atoms/Loader'

interface AttractionQuestionsListProps {
    attractionId: number
    onQuestionButtonPress: (questionMutateArgs: QuestionAnswerRequest) => void
    checkDisabled?: (question: string) => boolean
}

export const AttractionQuestionsList = ({
  attractionId,
  onQuestionButtonPress,
  checkDisabled,
}: AttractionQuestionsListProps) => {
  const {
    data: attraction,
  } = useGetAttractionIntro(attractionId ?? -1, !!attractionId)
  // todo - this state matches all questions. Find a way to recognize only one,
  // specific question to set button disabled state
  const [answerQuestionState] = useMutationState({
    filters: { mutationKey: [GET_ATTRACTION_QUESTION_ANSWER] },
    select: (mutation) => mutation.state,
  })
  const { data: questions, isLoading: areQuestionsFetching } = useGetAttractionQuestions(attractionId)
  const theme = useTheme()
  const styles = makeStyles(theme)

  if (areQuestionsFetching) {
    return <Loader />
  }

  return (
    <View style={styles.questionsList}>
      {questions?.map((question) => {
        const questionMutateArgs: QuestionAnswerRequest = {
          attractionCity: attraction.data.data.city,
          question,
          attractionName: attraction.data.data.name,
        }
        // @ts-ignore
        const disabled = (answerQuestionState?.variables.question === question
            && answerQuestionState?.status === 'pending')
            || checkDisabled?.(question)
        return (
          <Button
            key={question}
            title={question}
            onPress={() => onQuestionButtonPress(questionMutateArgs)}
            disabled={disabled}
          />
        )
      })}
    </View>
  )
}

const makeStyles = (theme: Theme) => StyleSheet.create({
  questionsList: {
    display: 'flex',
    gap: 12,
  },
})
