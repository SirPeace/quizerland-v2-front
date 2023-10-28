import type { IQuestionForm, IQuizFormState } from './types'

export const newDefaultQuestion = (): IQuestionForm => ({
  title: 'Новый вопрос',
  rightAnswerId: undefined,
  answers: new Array(3).fill(''),
})

const quizFormState: IQuizFormState = {
  quizDescription: {
    title: '',
    description: '',
  },
  questions: [newDefaultQuestion()],
}

export default quizFormState
