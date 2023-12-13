import type { IQuizFormState } from './types'

export const defaultQuestion = {
  title: 'Новый вопрос',
  rightAnswerId: 0,
  answers: [{ text: '' }, { text: '' }, { text: '' }],
}

const quizFormState: IQuizFormState = {
  quizDescription: {
    title: '',
    description: '',
  },
  questions: [defaultQuestion],
}

export default quizFormState
