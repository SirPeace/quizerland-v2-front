import type { ICreateQuizState } from './types'

const createQuizState: ICreateQuizState = {
  title: '',
  description: '',
  questions: [
    {
      id: 1,
      text: '',
      correctAnswerId: null,
      answers: [
        {
          id: 1,
          text: '',
        },
        {
          id: 2,
          text: '',
        },
        {
          id: 3,
          text: '',
        },
      ],
    },
  ],
}

export default createQuizState
