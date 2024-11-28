import axios from 'axios'

export const getQuestionAnswer = (question: string) => axios.post('/api/attraction/ask', { question })
