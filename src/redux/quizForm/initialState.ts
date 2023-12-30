import type { IQuestionForm, IQuizFormState } from './types'

export const defaultQuestion: IQuestionForm = {
  title: 'Новый вопрос',
  rightAnswerId: 0,
  answers: [{ text: '' }, { text: '' }, { text: '' }],
  errors: {},
}

const quizFormState: IQuizFormState = {
  quizDescription: {
    title: '',
    description: '',
    errors: {},
  },
  questions: [defaultQuestion],
}

export default quizFormState
