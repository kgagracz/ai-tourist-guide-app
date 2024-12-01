import { View } from 'react-native'
import { AskedQuestion } from '../AttractionQuestions/AttractionQuestions'
import { BoldText } from '../../atoms/BoldText'
import { NormalText } from '../../atoms/NormalText'

interface AttractionAnswersProps {
    askedQuestions: AskedQuestion[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AttractionAnswers = ({ askedQuestions }: AttractionAnswersProps) => (
  <View>
    {askedQuestions.map(({ question, answer }) => (
      <View>
        <BoldText>{question}</BoldText>
        <NormalText>{answer}</NormalText>
      </View>
    ))}
  </View>
)
